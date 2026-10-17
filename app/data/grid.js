/**
 * Grid & Logic — Interactive Grid Data
 *
 * This module defines the nodes and connections that form the "logic"
 * layer on top of the infinite grid. Each node represents a project,
 * capability, or idea. Connections represent the thinking that links them.
 */

// Node types define visual behavior and meaning
export const NODE_TYPES = {
  PROJECT: "project",
  CAPABILITY: "capability",
  PROCESS: "process",
  INSIGHT: "insight",
};

// Color palette for node types (derived from brand accent #00e6e6)
export const NODE_COLORS = {
  [NODE_TYPES.PROJECT]: "#00e6e6",      // Cyan - shipped work
  [NODE_TYPES.CAPABILITY]: "#8b5cf6",   // Violet - what we do
  [NODE_TYPES.PROCESS]: "#22d3ee",      // Sky - how we work
  [NODE_TYPES.INSIGHT]: "#facc15",      // Amber - thinking
};

// Grid configuration
export const gridConfig = {
  // Visual
  gridColor: "#1a2130",           // --color-line
  gridColorBright: "#2b3547",     // --color-line-bright
  gridSize: 200,                  // World units - extends far
  gridDivisions: 40,              // Lines per axis
  majorLineEvery: 5,              // Every 5th line is brighter

  // Camera
  initialPosition: { x: 0, y: 15, z: 25 },
  lookAt: { x: 0, y: 0, z: 0 },
  fov: 50,
  near: 0.1,
  far: 500,

  // Animation
  autoRotate: true,
  autoRotateSpeed: 0.05,
  pulseSpeed: 2.0,
  waveSpeed: 0.8,

  // Interaction
  mouseInfluenceRadius: 8,
  mouseInfluenceStrength: 0.5,
  hoverScale: 1.4,
  hoverTransitionDuration: 300,

  // Post-processing
  bloomStrength: 0.8,
  bloomRadius: 0.6,
  bloomThreshold: 0.3,
};

// Nodes distributed on the grid - each has a logical position
export const gridNodes = [
  // --- PROJECTS (cyan) - Shipped work ---
  {
    id: "sofa-configurator",
    type: NODE_TYPES.PROJECT,
    position: { x: -12, y: 0.5, z: -8 },
    label: "Sofa Configurator",
    detail: "Real-time material switching in browser",
    year: "2026",
    url: "https://abdulahad2468.github.io/sofa-configrator/",
    pulsePhase: 0,
    size: 1.2,
  },
  {
    id: "pixel-nest",
    type: NODE_TYPES.PROJECT,
    position: { x: 10, y: 0.5, z: -10 },
    label: "Pixel Nest Agency",
    detail: "Motion-led brand site",
    year: "2026",
    url: "https://pixelnestagy.vercel.app",
    pulsePhase: 1.2,
    size: 1.1,
  },
  {
    id: "clothing-store",
    type: NODE_TYPES.PROJECT,
    position: { x: -8, y: 0.5, z: 12 },
    label: "Clothing Store",
    detail: "Catalogue, cart, checkout for apparel",
    year: "2026",
    url: "https://clothing-lovat.vercel.app/",
    pulsePhase: 2.4,
    size: 1.15,
  },
  {
    id: "multi-brand",
    type: NODE_TYPES.PROJECT,
    position: { x: 14, y: 0.5, z: 6 },
    label: "Multi-brand Storefront",
    detail: "Product discovery built to scale",
    year: "2026",
    url: "https://e-commerce-chi-eight-35.vercel.app/",
    pulsePhase: 3.6,
    size: 1.1,
  },

  // --- CAPABILITIES (violet) - What we do ---
  {
    id: "3d-web",
    type: NODE_TYPES.CAPABILITY,
    position: { x: -16, y: 0.5, z: 0 },
    label: "Real-time 3D",
    detail: "Three.js, React Three Fiber, WebGL",
    pulsePhase: 0.5,
    size: 0.9,
  },
  {
    id: "configurators",
    type: NODE_TYPES.CAPABILITY,
    position: { x: 0, y: 0.5, z: -16 },
    label: "Product Configurators",
    detail: "Variant logic, pricing, mobile-first",
    pulsePhase: 1.7,
    size: 0.95,
  },
  {
    id: "headless-ecom",
    type: NODE_TYPES.CAPABILITY,
    position: { x: 16, y: 0.5, z: 0 },
    label: "Headless Ecommerce",
    detail: "Storefront, checkout, analytics",
    pulsePhase: 2.9,
    size: 0.9,
  },
  {
    id: "nextjs-eng",
    type: NODE_TYPES.CAPABILITY,
    position: { x: 0, y: 0.5, z: 16 },
    label: "Next.js Engineering",
    detail: "RSC, streaming, edge, performance",
    pulsePhase: 4.1,
    size: 0.9,
  },
  {
    id: "conversion-design",
    type: NODE_TYPES.CAPABILITY,
    position: { x: -10, y: 0.5, z: -14 },
    label: "Conversion Design",
    detail: "Funnels, CRO, journey mapping",
    pulsePhase: 1.1,
    size: 0.85,
  },
  {
    id: "brand-systems",
    type: NODE_TYPES.CAPABILITY,
    position: { x: 10, y: 0.5, z: 14 },
    label: "Brand Systems",
    detail: "Identity, social, launch campaigns",
    pulsePhase: 2.3,
    size: 0.85,
  },
  {
    id: "perf-audits",
    type: NODE_TYPES.CAPABILITY,
    position: { x: -14, y: 0.5, z: 10 },
    label: "Performance Audits",
    detail: "Core Web Vitals, bundle, runtime",
    pulsePhase: 3.5,
    size: 0.8,
  },
  {
    id: "motion-design",
    type: NODE_TYPES.CAPABILITY,
    position: { x: 14, y: 0.5, z: -6 },
    label: "Motion Design",
    detail: "Framer Motion, GSAP, scroll-driven",
    pulsePhase: 4.7,
    size: 0.8,
  },

  // --- PROCESS (sky) - How we work ---
  {
    id: "discover",
    type: NODE_TYPES.PROCESS,
    position: { x: -6, y: 0.5, z: -6 },
    label: "Discover",
    detail: "Business, customers, opportunity",
    step: "01",
    pulsePhase: 0.8,
    size: 1.0,
  },
  {
    id: "define",
    type: NODE_TYPES.PROCESS,
    position: { x: 6, y: 0.5, z: -6 },
    label: "Define",
    detail: "Solution, scope, plan with dates",
    step: "02",
    pulsePhase: 2.0,
    size: 1.0,
  },
  {
    id: "design",
    type: NODE_TYPES.PROCESS,
    position: { x: 6, y: 0.5, z: 6 },
    label: "Design",
    detail: "Interface, interactions, in-browser",
    step: "03",
    pulsePhase: 3.2,
    size: 1.0,
  },
  {
    id: "develop",
    type: NODE_TYPES.PROCESS,
    position: { x: -6, y: 0.5, z: 6 },
    label: "Develop",
    detail: "Build, test, launch, measure, iterate",
    step: "04",
    pulsePhase: 4.4,
    size: 1.0,
  },

  // --- INSIGHTS (amber) - Thinking ---
  {
    id: "configurator-converts",
    type: NODE_TYPES.INSIGHT,
    position: { x: -4, y: 0.5, z: -10 },
    label: "3D that converts",
    detail: "Configurators aren't toys — they close sales",
    pulsePhase: 0.3,
    size: 0.75,
  },
  {
    id: "brand-survives",
    type: NODE_TYPES.INSIGHT,
    position: { x: 4, y: 0.5, z: 10 },
    label: "Systems > assets",
    detail: "Identity that survives a real calendar",
    pulsePhase: 1.5,
    size: 0.75,
  },
  {
    id: "perf-is-feature",
    type: NODE_TYPES.INSIGHT,
    position: { x: -10, y: 0.5, z: 4 },
    label: "Performance is a feature",
    detail: "Every ms impacts conversion",
    pulsePhase: 2.7,
    size: 0.75,
  },
  {
    id: "motion-with-purpose",
    type: NODE_TYPES.INSIGHT,
    position: { x: 10, y: 0.5, z: -2 },
    label: "Motion with purpose",
    detail: "Animation that guides, not decorates",
    pulsePhase: 3.9,
    size: 0.75,
  },
];

// Connections - the "logic" linking nodes
// Each connection has a semantic meaning
export const gridConnections = [
  // Process flow (sequential)
  { from: "discover", to: "define", type: "flow", strength: 1.0 },
  { from: "define", to: "design", type: "flow", strength: 1.0 },
  { from: "design", to: "develop", type: "flow", strength: 1.0 },

  // Capabilities feed into projects
  { from: "3d-web", to: "sofa-configurator", type: "enables", strength: 0.9 },
  { from: "configurators", to: "sofa-configurator", type: "enables", strength: 1.0 },
  { from: "motion-design", to: "sofa-configurator", type: "enables", strength: 0.7 },
  { from: "perf-audits", to: "sofa-configurator", type: "enables", strength: 0.6 },

  { from: "3d-web", to: "pixel-nest", type: "enables", strength: 0.8 },
  { from: "motion-design", to: "pixel-nest", type: "enables", strength: 1.0 },
  { from: "brand-systems", to: "pixel-nest", type: "enables", strength: 0.9 },

  { from: "headless-ecom", to: "clothing-store", type: "enables", strength: 1.0 },
  { from: "nextjs-eng", to: "clothing-store", type: "enables", strength: 0.9 },
  { from: "conversion-design", to: "clothing-store", type: "enables", strength: 0.8 },

  { from: "headless-ecom", to: "multi-brand", type: "enables", strength: 1.0 },
  { from: "nextjs-eng", to: "multi-brand", type: "enables", strength: 0.9 },
  { from: "perf-audits", to: "multi-brand", type: "enables", strength: 0.8 },

  // Insights connect to process + capabilities
  { from: "discover", to: "configurator-converts", type: "insight", strength: 0.8 },
  { from: "configurators", to: "configurator-converts", type: "insight", strength: 0.9 },
  { from: "define", to: "brand-survives", type: "insight", strength: 0.7 },
  { from: "brand-systems", to: "brand-survives", type: "insight", strength: 1.0 },
  { from: "develop", to: "perf-is-feature", type: "insight", strength: 0.8 },
  { from: "perf-audits", to: "perf-is-feature", type: "insight", strength: 1.0 },
  { from: "design", to: "motion-with-purpose", type: "insight", strength: 0.7 },
  { from: "motion-design", to: "motion-with-purpose", type: "insight", strength: 1.0 },

  // Cross-capability connections (the "grid" thinking)
  { from: "3d-web", to: "headless-ecom", type: "related", strength: 0.4 },
  { from: "configurators", to: "conversion-design", type: "related", strength: 0.6 },
  { from: "nextjs-eng", to: "perf-audits", type: "related", strength: 0.5 },
  { from: "brand-systems", to: "motion-design", type: "related", strength: 0.5 },
];

// Helper to get node by ID
export function getNode(id) {
  return gridNodes.find((n) => n.id === id);
}

// Helper to get connections for a node
export function getConnectionsForNode(nodeId) {
  return gridConnections.filter(
    (c) => c.from === nodeId || c.to === nodeId
  );
}

// Connection type styles
export const CONNECTION_STYLES = {
  flow: { color: "#00e6e6", dash: false, width: 3, label: "flow" },      // Cyan - process
  enables: { color: "#8b5cf6", dash: true, width: 2, label: "enables" },   // Violet - capability → project
  insight: { color: "#facc15", dash: true, width: 1.5, label: "insight" }, // Amber - thinking
  related: { color: "#22d3ee", dash: true, width: 1, label: "related" },   // Sky - cross-links
};