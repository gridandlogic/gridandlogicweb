"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { globeArcs, globeConfig } from "@/app/data/globe";

// Every arc endpoint doubles as a glowing point and an expanding ring. The arc
// data is a module constant, so derive this once instead of on every render.
const rings = globeArcs.map((arc) => ({
  lat: arc.endLat,
  lng: arc.endLng,
  color: arc.color,
}));

/**
 * The three.js globe itself. Loaded through next/dynamic from GlobeVisual so
 * three.js and react-globe.gl stay out of the initial page bundle.
 */
export default function GlobeCanvas({ width, height }) {
  const globeRef = useRef(null);

  // A lazy state initializer rather than a ref: the material is read during
  // render to feed `globeMaterial`, and it has to keep a stable identity so
  // react-globe.gl does not swap the material on every render.
  const [material] = useState(
    () =>
      new THREE.MeshPhongMaterial({
        color: globeConfig.globeColor,
        emissive: globeConfig.emissive,
        emissiveIntensity: globeConfig.emissiveIntensity,
        shininess: globeConfig.shininess,
      })
  );

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.enableZoom = false;
      controls.autoRotate = globeConfig.autoRotate;
      controls.autoRotateSpeed = globeConfig.autoRotateSpeed;
    }
    globeRef.current?.pointOfView(
      { ...globeConfig.initialPosition, altitude: 2.2 },
      1200
    );
  }, []);

  // three.js will not free the material on its own.
  useEffect(() => () => material.dispose(), [material]);

  return (
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={material}
      showAtmosphere={globeConfig.showAtmosphere}
      atmosphereColor={globeConfig.atmosphereColor}
      atmosphereAltitude={globeConfig.atmosphereAltitude}
      arcsData={globeArcs}
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcColor="color"
      arcAltitude="arcAlt"
      arcStroke={0.4}
      arcDashLength={globeConfig.arcLength}
      arcDashGap={0.25}
      arcDashInitialGap={(d) => d.order * 0.12}
      arcDashAnimateTime={globeConfig.arcTime}
      pointsData={rings}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointRadius={0.22}
      pointAltitude={0.008}
      ringsData={rings}
      ringLat="lat"
      ringLng="lng"
      ringColor="color"
      ringMaxRadius={2.4}
      ringPropagationSpeed={1.1}
      ringRepeatPeriod={2200}
      animateIn={false}
    />
  );
}
