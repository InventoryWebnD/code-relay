"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Preload } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, ToneMapping, Vignette } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import Environment from "./Environment";
import SetPieces from "./SetPieces";
import Director from "./Director";

// postprocessing reads gl.getContextAttributes().alpha, which is null once the
// WebGL context is lost (GPU reset, dev remount, too many contexts) — only mount
// the composer while the context is alive.
const contextAlive = (gl: THREE.WebGLRenderer) => {
  const ctx = gl.getContext();
  return !ctx.isContextLost() && ctx.getContextAttributes() !== null;
};

type Tier = "high" | "low";

/** phones, tablets and modest laptops start on the light tier */
function initialTier(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const small = window.innerWidth < 820;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const weak = (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4;
  return small || coarse || weak ? "low" : "high";
}

const DPR: Record<Tier, [number, number]> = { high: [1, 1.75], low: [1, 1.5] };

export default function StoryCanvas({ active, onReady }: { active: boolean; onReady?: () => void }) {
  const [fx, setFx] = useState(false);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [dpr, setDpr] = useState<[number, number] | number>(() => DPR[tier]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [5, 2, 12], fov: 34, near: 0.1, far: 2000 }}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault(); // allow the browser to restore the context
          setFx(false);
        });
        canvas.addEventListener("webglcontextrestored", () => setFx(contextAlive(gl)));
        setFx(contextAlive(gl));
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
    >
      {/* drop to the light tier (then to 1x pixels) if the device can't hold the frame rate */}
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => {
          setTier("low");
          setDpr(DPR.low);
        }}
        onFallback={() => {
          setTier("low");
          setDpr(1);
        }}
      />
      <Environment />
      <SetPieces />
      <Director />
      {fx && (
        <EffectComposer multisampling={tier === "high" ? 4 : 0}>
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={1.15} radius={0.75} />
          <Vignette offset={0.25} darkness={0.65} />
          <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.16} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
      {/* compile every shader up front so no chapter hitches the first time it appears */}
      <Preload all />
    </Canvas>
  );
}
