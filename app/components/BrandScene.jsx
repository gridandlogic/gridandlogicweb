"use client";
import { useEffect, useRef, useState } from "react";

export default function BrandScene() {
  const host = useRef(null),
    controller = useRef(null);
  const [ready, setReady] = useState(false),
    [color, setColor] = useState("#42f5e1"),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    let disposed = false,
      cleanup = () => {};
    async function mount() {
      try {
        const [T, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        if (disposed || !host.current) return;
        const el = host.current,
          scene = new T.Scene(),
          camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(0, 0.1, 8.7);
        const renderer = new T.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.45;
        el.appendChild(renderer.domElement);
        const pmrem = new T.PMREMGenerator(renderer),
          room = new RoomEnvironment(),
          env = pmrem.fromScene(room, 0.04);
        scene.environment = env.texture;
        room.dispose();
        pmrem.dispose();
        scene.add(new T.AmbientLight(0xffffff, 0.7));
        const key = new T.DirectionalLight(0xc4fff6, 5);
        key.position.set(3, 5, 4);
        scene.add(key);
        const rim = new T.PointLight(0x42f5e1, 40, 14);
        rim.position.set(-3, -1, 2);
        scene.add(rim);
        const shape = new T.Shape();
        const points = [
          [-1.55, 1.08],
          [-1.08, 1.55],
          [1.08, 1.55],
          [1.55, 1.08],
          [1.55, 0.6],
          [0.91, 0.6],
          [0.91, 0.89],
          [-0.76, 0.89],
          [-0.91, 0.74],
          [-0.91, -0.74],
          [-0.76, -0.89],
          [0.91, -0.89],
          [0.91, -0.25],
          [0.05, -0.25],
          [0.05, 0.35],
          [1.55, 0.35],
          [1.55, -1.08],
          [1.08, -1.55],
          [-1.08, -1.55],
          [-1.55, -1.08],
        ];
        points.forEach(([x, y], i) =>
          i ? shape.lineTo(x, y) : shape.moveTo(x, y),
        );
        shape.closePath();
        const geometry = new T.ExtrudeGeometry(shape, {
          depth: 0.34,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.09,
          bevelSegments: 4,
          steps: 1,
        });
        geometry.center();
        const metal = new T.MeshPhysicalMaterial({
          color: 0x879794,
          metalness: 1,
          roughness: 0.26,
          clearcoat: 1,
          clearcoatRoughness: 0.23,
        });
        const teal = new T.MeshPhysicalMaterial({
          color: 0x42f5e1,
          metalness: 0.7,
          roughness: 0.2,
          emissive: 0x42f5e1,
          emissiveIntensity: 0.18,
        });
        const group = new T.Group();
        scene.add(group);
        const mark = new T.Mesh(geometry, [metal, teal]);
        group.add(mark);
        const back = new T.Mesh(geometry, teal);
        back.scale.setScalar(1.07);
        back.position.z = -0.49;
        group.add(back);
        const edgesGeometry = new T.EdgesGeometry(geometry, 35),
          edgeMaterial = new T.LineBasicMaterial({
            color: 0x8ffff0,
            transparent: true,
            opacity: 0.3,
          });
        const edges = new T.LineSegments(edgesGeometry, edgeMaterial);
        group.add(edges);
        const orbitGeometry = new T.TorusGeometry(2.35, 0.007, 5, 100),
          orbitMaterial = new T.MeshBasicMaterial({
            color: 0x42f5e1,
            transparent: true,
            opacity: 0.22,
          });
        const orbit = new T.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = 1.1;
        orbit.rotation.y = 0.3;
        scene.add(orbit);
        const orbit2 = orbit.clone();
        orbit2.scale.setScalar(1.18);
        orbit2.rotation.x = 1.35;
        orbit2.rotation.z = 0.7;
        scene.add(orbit2);
        const target = { x: 0, y: 0, turn: 0, paused: false };
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        let visible = true,
          frame,
          last = 0;
        const start = performance.now();
        controller.current = {
          setColor(value) {
            teal.color.set(value);
            teal.emissive.set(value);
            rim.color.set(value);
            orbitMaterial.color.set(value);
          },
          rotate() {
            target.turn += Math.PI / 2;
          },
          pause(value) {
            target.paused = value;
          },
        };
        const move = (e) => {
          const r = el.getBoundingClientRect();
          target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.55;
          target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
        };
        const leave = () => {
          target.x = 0;
          target.y = 0;
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        const resize = () => {
          const r = el.getBoundingClientRect();
          renderer.setSize(r.width, r.height);
          camera.aspect = r.width / r.height;
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();
        const io = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
        });
        io.observe(el);
        function render(now) {
          frame = requestAnimationFrame(render);
          if (!visible || document.hidden || now - last < 32) return;
          last = now;
          const moving = !reduced.matches && !target.paused;
          const t = (now - start) / 1000;
          group.rotation.y +=
            (target.x - 0.45 + target.turn - group.rotation.y) * 0.055;
          group.rotation.x += (-target.y + 0.17 - group.rotation.x) * 0.055;
          group.rotation.z = moving ? Math.sin(t * 0.35) * 0.045 : -0.03;
          group.position.y = moving ? Math.sin(t * 0.75) * 0.12 : 0;
          orbit.rotation.z = moving ? t * 0.035 : 0;
          renderer.render(scene, camera);
        }
        renderer.render(scene, camera);
        setReady(true);
        frame = requestAnimationFrame(render);
        cleanup = () => {
          cancelAnimationFrame(frame);
          ro.disconnect();
          io.disconnect();
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          geometry.dispose();
          metal.dispose();
          teal.dispose();
          edgesGeometry.dispose();
          edgeMaterial.dispose();
          orbitGeometry.dispose();
          orbitMaterial.dispose();
          env.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          controller.current = null;
        };
      } catch {
        /* The static sculpture remains available when WebGL is unavailable. */
      }
    }
    mount();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  function tint(value) {
    setColor(value);
    controller.current?.setColor(value);
  }
  return (
    <div className={`hero-art brand-stage ${ready ? "webgl-ready" : ""}`}>
      <div className="art-grid" />
      <div className="scene-host" ref={host} aria-hidden="true" />
      <div className="sculpture scene-fallback" aria-hidden="true">
        <div className="slab s1" />
        <div className="slab s2" />
        <div className="slab s3" />
        <div className="slab s4">
          <img
            src="/assets/logo-original.png"
            alt=""
            width="195"
            height="195"
          />
        </div>
      </div>
      <span className="art-label">DESIGN × ENGINEERING × POSSIBILITY</span>
      <span className="art-tag a">
        <span className="dot" />
        Creativity, engineered.
      </span>
      <span className="art-tag b">
        <span style={{ color: "var(--cyan)" }}>↗</span>Built to move your
        business.
      </span>
      <div className="scene-controls" aria-label="3D artwork controls">
        <span className="scene-hint">MOVE YOUR CURSOR TO EXPLORE</span>
        <div className="scene-buttons">
          <button
            className="swatch mint"
            aria-label="Mint finish"
            aria-pressed={color === "#42f5e1"}
            onClick={() => tint("#42f5e1")}
          />
          <button
            className="swatch blue"
            aria-label="Electric blue finish"
            aria-pressed={color === "#78a6ff"}
            onClick={() => tint("#78a6ff")}
          />
          <button
            className="scene-tool"
            onClick={() => controller.current?.rotate()}
            aria-label="Rotate 3D artwork"
          >
            ↻
          </button>
          <button
            className="scene-tool"
            onClick={() => {
              setPaused(!paused);
              controller.current?.pause(!paused);
            }}
            aria-label={paused ? "Resume animation" : "Pause animation"}
          >
            {paused ? "▷" : "Ⅱ"}
          </button>
        </div>
      </div>
    </div>
  );
}
