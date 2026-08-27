/**
 * Arc data for the global-reach globe. Shared by whichever section renders it
 * so the coordinate list only exists once.
 */
const CYAN = "#00e6e6";
const BLUE = "#38bdf8";
const VIOLET = "#8b5cf6";

export const globeArcs = [
  { order: 1, startLat: 24.8607, startLng: 67.0011, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.1, color: CYAN },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: BLUE },
  { order: 1, startLat: 24.8607, startLng: 67.0011, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.35, color: VIOLET },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: CYAN },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: BLUE },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: VIOLET },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: CYAN },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: BLUE },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: VIOLET },
  { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: CYAN },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: BLUE },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.1, color: VIOLET },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: CYAN },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: BLUE },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.2, color: VIOLET },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: CYAN },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: BLUE },
  { order: 6, startLat: 40.7128, startLng: -74.006, endLat: 24.8607, endLng: 67.0011, arcAlt: 0.55, color: VIOLET },
  { order: 7, startLat: 48.8566, startLng: 2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: CYAN },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.25, color: BLUE },
  { order: 7, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: VIOLET },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: CYAN },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: BLUE },
  { order: 8, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.25, color: VIOLET },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: CYAN },
  { order: 9, startLat: 25.2048, startLng: 55.2708, endLat: 41.9028, endLng: 12.4964, arcAlt: 0.25, color: BLUE },
  { order: 9, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: VIOLET },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: CYAN },
  { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: BLUE },
  { order: 10, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: VIOLET },
  { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: CYAN },
  { order: 11, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: BLUE },
  { order: 11, startLat: 52.52, startLng: 13.405, endLat: 24.8607, endLng: 67.0011, arcAlt: 0.4, color: VIOLET },
  { order: 12, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3, color: CYAN },
  { order: 12, startLat: 37.7749, startLng: -122.4194, endLat: 47.6062, endLng: -122.3321, arcAlt: 0.1, color: BLUE },
  { order: 12, startLat: 25.2048, startLng: 55.2708, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.35, color: VIOLET },
];

export const globeConfig = {
  globeColor: "#0a1a2e",
  emissive: "#071320",
  emissiveIntensity: 0.12,
  shininess: 0.85,
  showAtmosphere: true,
  atmosphereColor: "#7fdcff",
  atmosphereAltitude: 0.14,
  arcTime: 1600,
  arcLength: 0.85,
  autoRotate: true,
  autoRotateSpeed: 0.45,
  initialPosition: { lat: 24.8607, lng: 67.0011 },
};
