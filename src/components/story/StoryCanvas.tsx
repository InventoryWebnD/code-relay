"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, ToneMapping, Vignette } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import Environment from "./Environment";
import SetPieces from "./SetPieces";
import Director from "./Director";

export default function StoryCanvas({ active, onReady }: { active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [5, 2, 12], fov: 34, near: 0.1, far: 2000 }}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
    >
      <Environment />
      <SetPieces />
      <Director />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={1.15} radius={0.75} />
        <Vignette offset={0.25} darkness={0.65} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.16} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
