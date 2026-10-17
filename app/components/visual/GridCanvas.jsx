"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  gridConfig,
  gridNodes,
  gridConnections,
  getConnectionsForNode,
  CONNECTION_STYLES,
  NODE_COLORS,
} from "@/app/data/grid";
import { cn } from "@/app/lib/utils";

// ---- Shader for grid lines with subtle animation ----
const gridVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = `
  uniform float uTime;
  uniform vec3 uGridColor;
  uniform vec3 uGridColorBright;
  uniform float uMajorLineEvery;
  varying vec2 vUv;

  void main() {
    float gridScale = 40.0;
    vec2 grid = fract(vUv * gridScale);
    vec2 gridId = floor(vUv * gridScale);

    // Major lines every N
    float major = step(mod(gridId.x, uMajorLineEvery), 0.5) + step(mod(gridId.y, uMajorLineEvery), 0.5);
    major = clamp(major, 0.0, 1.0);

    float line = 0.0;
    line += step(0.98, grid.x) + step(0.98, grid.y);
    line += step(0.02, grid.x) + step(0.02, grid.y);

    vec3 color = mix(uGridColor, uGridColorBright, major * 0.5);

    // Subtle pulse on major lines
    float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + gridId.x * 0.3 + gridId.y * 0.3);
    color *= mix(1.0, 1.3, major * pulse * 0.3);

    float alpha = line * (0.3 + major * 0.4);
    gl_FragColor = vec4(color, alpha);
  }
`;

// ---- Shader for node points with glow ----
const nodeVertexShader = `
  attribute float aSize;
  attribute float aPulsePhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uHoverScale;
  uniform float uHoverProgress;
  varying float vPulse;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vPulse = aPulsePhase;
    float pulse = 0.8 + 0.4 * sin(uTime * 2.0 + aPulsePhase);
    float size = aSize * pulse * mix(1.0, uHoverScale, uHoverProgress);
    vAlpha = mix(0.6, 1.0, uHoverProgress);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const nodeFragmentShader = `
  uniform float uTime;
  varying float vPulse;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vAlpha;

    // Core glow
    float glow = 1.0 - smoothstep(0.0, 0.4, dist);
    vec3 color = vColor * (1.0 + glow * 0.5);

    // Outer ring pulse
    float ring = smoothstep(0.45, 0.5, dist) * (0.5 + 0.5 * sin(uTime * 3.0 + vPulse * 5.0));
    color += vColor * ring * 0.3;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ---- Shader for connection lines ----
const connectionVertexShader = `
  attribute float aProgress;
  attribute vec3 aColor;
  uniform float uTime;
  varying float vProgress;
  varying vec3 vColor;

  void main() {
    vProgress = aProgress;
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const connectionFragmentShader = `
  uniform float uTime;
  uniform float uDashOffset;
  varying float vProgress;
  varying vec3 vColor;

  void main() {
    // Animated dash pattern
    float dash = sin(vProgress * 20.0 + uTime * 2.0 + uDashOffset);
    float alpha = smoothstep(-0.5, 0.5, dash) * vProgress;
    gl_FragColor = vec4(vColor, alpha * 0.6);
  }
`;

// ---- Label component for CSS2D ----
function NodeLabel({ node, isHovered, onClick }) {
  const typeStyles = {
    project: "bg-cyan-500/20 border-cyan-500/40",
    capability: "bg-violet-500/20 border-violet-500/40",
    process: "bg-sky-500/20 border-sky-500/40",
    insight: "bg-amber-500/20 border-amber-500/40",
  };

  return (
    <div
      className={cn(
        "pointer-events-none transform -translate-x-1/2 transition-all duration-300",
        "whitespace-nowrap",
        isHovered
          ? "scale-100 opacity-100 translate-y-[-40px]"
          : "scale-90 opacity-0 translate-y-[-30px]"
      )}
      style={{ pointerEvents: isHovered ? "auto" : "none" }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(node);
        }}
        className={cn(
          "group flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm",
          "text-xs font-mono text-ink-faint",
          "hover:text-accent hover:border-accent/60 transition-colors",
          typeStyles[node.type]
        )}
        style={{ fontSize: "0.65rem" }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: NODE_COLORS[node.type] }} />
        <span className="font-medium text-ink">{node.label}</span>
        {node.step && <span className="text-accent/70">{node.step}</span>}
      </button>
    </div>
  );
}

// ---- Detail panel for clicked node ----
function DetailPanel({ node, onClose }) {
  if (!node) return null;

  const typeLabels = {
    project: "SHIPPED PROJECT",
    capability: "CAPABILITY",
    process: "PROCESS STEP",
    insight: "INSIGHT",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <div
        className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-panel border border-line bg-panel p-6 shadow-2xl shadow-black/60 animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-faint">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: NODE_COLORS[node.type] }}
              />
              {typeLabels[node.type]}
            </div>
            <h3 id="detail-title" className="mt-2 text-h3 text-ink truncate">
              {node.label}
            </h3>
            {node.detail && (
              <p className="mt-3 text-lead text-ink-dim">{node.detail}</p>
            )}
            {node.year && (
              <p className="mt-2 text-sm font-mono text-ink-faint">{node.year}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-line text-ink-faint hover:text-ink transition-colors"
            aria-label="Close detail"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {node.url && (
          <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block w-full text-center rounded-card bg-accent/10 border border-accent/30 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
          >
            View Live →
          </a>
        )}
      </div>
    </div>
  );
}

export default function GridCanvas({ width, height }) {
  const containerRef = useRef(null);
  const labelRendererRef = useRef(null);
  const composerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [labelObjects, setLabelObjects] = useState(new Map());

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      gridConfig.fov,
      width / height,
      gridConfig.near,
      gridConfig.far
    );
    camera.position.set(
      gridConfig.initialPosition.x,
      gridConfig.initialPosition.y,
      gridConfig.initialPosition.z
    );
    camera.lookAt(
      gridConfig.lookAt.x,
      gridConfig.lookAt.y,
      gridConfig.lookAt.z
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Label renderer (CSS2D)
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(labelRenderer.domElement);
    labelRendererRef.current = labelRenderer;

    // Post-processing composer
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      gridConfig.bloomStrength,
      gridConfig.bloomRadius,
      gridConfig.bloomThreshold
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // ---- Create Grid Plane ----
    const gridGeometry = new THREE.PlaneGeometry(
      gridConfig.gridSize,
      gridConfig.gridSize,
      gridConfig.gridDivisions,
      gridConfig.gridDivisions
    );
    gridGeometry.rotateX(-Math.PI / 2);

    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uGridColor: { value: new THREE.Color(gridConfig.gridColor) },
        uGridColorBright: { value: new THREE.Color(gridConfig.gridColorBright) },
        uMajorLineEvery: { value: gridConfig.majorLineEvery },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.position.y = 0;
    scene.add(gridMesh);

    // ---- Create Nodes (Instanced Points) ----
    const nodeCount = gridNodes.length;
    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    const pulsePhases = new Float32Array(nodeCount);
    const colors = new Float32Array(nodeCount * 3);
    const nodeIds = new Float32Array(nodeCount);

    const nodeObjects = [];

    gridNodes.forEach((node, i) => {
      const idx = i * 3;
      positions[idx] = node.position.x;
      positions[idx + 1] = node.position.y;
      positions[idx + 2] = node.position.z;
      sizes[i] = node.size;
      pulsePhases[i] = node.pulsePhase;
      const color = new THREE.Color(NODE_COLORS[node.type]);
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
      nodeIds[i] = i;

      // Create CSS2D label
      const labelDiv = document.createElement("div");
      // We'll use React to render labels instead
    });

    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    nodeGeometry.setAttribute("aPulsePhase", new THREE.BufferAttribute(pulsePhases, 1));
    nodeGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    nodeGeometry.setAttribute("aNodeId", new THREE.BufferAttribute(nodeIds, 1));

    const nodeMaterial = new THREE.ShaderMaterial({
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uHoverScale: { value: gridConfig.hoverScale },
        uHoverProgress: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    nodesMesh.name = "nodes";
    scene.add(nodesMesh);

    // ---- Create Connections (Lines) ----
    const connectionGeometries = [];
    const connectionMaterials = [];
    const connectionMeshes = [];

    gridConnections.forEach((conn, connIdx) => {
      const fromNode = getNode(conn.from);
      const toNode = getNode(conn.to);
      if (!fromNode || !toNode) return;

      const style = CONNECTION_STYLES[conn.type];
      const pointCount = 64;
      const positions = new Float32Array(pointCount * 3);
      const progresses = new Float32Array(pointCount);
      const connColors = new Float32Array(pointCount * 3);
      const color = new THREE.Color(style.color);

      for (let i = 0; i < pointCount; i++) {
        const t = i / (pointCount - 1);
        // Curved path with slight arc
        const height = Math.sin(t * Math.PI) * 3 * conn.strength;
        const x = THREE.MathUtils.lerp(fromNode.position.x, toNode.position.x, t);
        const y = THREE.MathUtils.lerp(fromNode.position.y, toNode.position.y, t) + height;
        const z = THREE.MathUtils.lerp(fromNode.position.z, toNode.position.z, t);

        const idx = i * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
        progresses[i] = t;
        connColors[idx] = color.r;
        connColors[idx + 1] = color.g;
        connColors[idx + 2] = color.b;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("aProgress", new THREE.BufferAttribute(progresses, 1));
      geom.setAttribute("aColor", new THREE.BufferAttribute(connColors, 3));

      const mat = new THREE.ShaderMaterial({
        vertexShader: connectionVertexShader,
        fragmentShader: connectionFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uDashOffset: { value: connIdx * 0.5 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Line(geom, mat);
      mesh.name = `connection-${connIdx}`;
      scene.add(mesh);

      connectionGeometries.push(geom);
      connectionMaterials.push(mat);
      connectionMeshes.push(mesh);
    });

    // ---- Create CSS2D Labels for nodes ----
    const labelMap = new Map();
    gridNodes.forEach((node, i) => {
      const labelEl = document.createElement("div");
      const label = new CSS2DObject(labelEl);
      label.position.set(node.position.x, node.position.y + 2, node.position.z);
      label.visible = false;
      scene.add(label);
      labelMap.set(node.id, { object: label, element: labelEl, node });
    });
    setLabelObjects(labelMap);

    // ---- Raycasting for hover ----
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;

    function onMouseMove(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      setMouse(new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      ));
    }

    function onClick(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(clickMouse, camera);
      const intersects = raycaster.intersectObject(nodesMesh);
      if (intersects.length > 0) {
        const nodeIdx = intersects[0].object.geometry.attributes.aNodeId.getX(intersects[0].index);
        const node = gridNodes[nodeIdx];
        setSelectedNode(node);
      }
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    // ---- Animation Loop ----
    let time = 0;
    let hoverProgress = 0;
    let targetHoverProgress = 0;
    let currentHoveredIndex = -1;

    function animate() {
      animationRef.current = requestAnimationFrame(animate);
      time += 1 / 60;

      // Update grid time uniform
      gridMaterial.uniforms.uTime.value = time;

      // Update node time uniform
      nodeMaterial.uniforms.uTime.value = time;

      // Update connection time uniforms
      connectionMaterials.forEach((mat) => {
        mat.uniforms.uTime.value = time;
      });

      // Raycast for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(nodesMesh);

      let newHoveredIndex = -1;
      if (intersects.length > 0) {
        newHoveredIndex = intersects[0].object.geometry.attributes.aNodeId.getX(intersects[0].index);
      }

      if (newHoveredIndex !== currentHoveredIndex) {
        currentHoveredIndex = newHoveredIndex;
        targetHoverProgress = newHoveredIndex >= 0 ? 1 : 0;
        const node = newHoveredIndex >= 0 ? gridNodes[newHoveredIndex] : null;
        setHoveredNodeId(node?.id ?? null);

        // Update label visibility
        labelMap.forEach(({ object, node: labelNode }, id) => {
          object.visible = id === (node?.id ?? "");
        });
      }

      // Smooth hover transition
      hoverProgress += (targetHoverProgress - hoverProgress) * 0.15;
      nodeMaterial.uniforms.uHoverProgress.value = hoverProgress;

      // Auto-rotate camera
      if (gridConfig.autoRotate) {
        const radius = Math.sqrt(
          camera.position.x ** 2 + camera.position.z ** 2
        );
        const angle = time * gridConfig.autoRotateSpeed;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.lookAt(0, 0, 0);
      }

      // Subtle camera float
      camera.position.y = gridConfig.initialPosition.y + Math.sin(time * 0.3) * 0.5;

      // Update label renderer
      labelRenderer.render(scene, camera);

      // Render with post-processing
      composer.render();
    }

    animate();

    // Handle resize
    function onResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      labelRenderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    }

    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);

      // Dispose Three.js objects
      gridGeometry.dispose();
      gridMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      connectionGeometries.forEach((g) => g.dispose());
      connectionMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      labelRenderer.domElement.remove();
    };
  }, [width, height]);

  // Render labels using React (simplified - we'll use the labelObjects map)
  useEffect(() => {
    // Update label elements based on hover state
    labelObjects.forEach(({ object, element, node }) => {
      const isHovered = node.id === hoveredNodeId;
      element.innerHTML = `
        <div class="pointer-events-none transform -translate-x-1/2 transition-all duration-300 whitespace-nowrap ${
          isHovered ? "scale-100 opacity-100 translate-y-[-40px]" : "scale-90 opacity-0 translate-y-[-30px]"
        }" style="pointer-events: ${isHovered ? "auto" : "none"};">
          <button class="group flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm text-xs font-mono text-ink-faint hover:text-accent hover:border-accent/60 transition-colors" style="font-size: 0.65rem;">
            <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background-color: ${NODE_COLORS[node.type]}"></span>
            <span class="font-medium text-ink">${node.label}</span>
            ${node.step ? `<span class="text-accent/70">${node.step}</span>` : ""}
          </button>
        </div>
      `;
    });
  }, [hoveredNodeId, labelObjects]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full", "touch-action-none")}
      style={{ width, height }}
      aria-hidden="true"
    >
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}