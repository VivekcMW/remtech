"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import * as THREE from "three"

interface ReamerToolProps {
  readonly scale?: number
}

function ReamerTool({ scale = 1 }: ReamerToolProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Slow auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  // Metallic material for carbide
  const carbideMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#8a8a8a"
      metalness={0.95}
      roughness={0.15}
      envMapIntensity={1.2}
    />
  ), [])

  // Slightly different material for the shank
  const shankMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#6b6b6b"
      metalness={0.85}
      roughness={0.25}
      envMapIntensity={1}
    />
  ), [])

  // Coating material (TiAlN - golden/bronze)
  const coatingMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#b8860b"
      metalness={0.9}
      roughness={0.2}
      envMapIntensity={1.5}
    />
  ), [])

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={groupRef} scale={scale} rotation={[0.1, 0, Math.PI * 0.08]}>
        {/* Main body - cutting section */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 3, 32]} />
          {coatingMaterial}
        </mesh>

        {/* Flutes (cutting grooves) - 4 flutes */}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, (Math.PI / 2) * i, 0]}>
            <mesh
              position={[0.12, -1.4, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <boxGeometry args={[0.05, 2.8, 0.08]} />
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.3}
                roughness={0.8}
              />
            </mesh>
          </group>
        ))}

        {/* Chamfer at tip */}
        <mesh position={[0, 1.6, 0]}>
          <coneGeometry args={[0.18, 0.25, 32]} />
          {coatingMaterial}
        </mesh>

        {/* Neck transition */}
        <mesh position={[0, -1.7, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.4, 32]} />
          {carbideMaterial}
        </mesh>

        {/* Shank */}
        <mesh position={[0, -3.2, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 2.6, 32]} />
          {shankMaterial}
        </mesh>

        {/* Holder grip section (knurled pattern effect) */}
        <mesh position={[0, -4.8, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.6, 16]} />
          <meshStandardMaterial
            color="#4a4a4a"
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>

        {/* Coolant through hole indicator */}
        <mesh position={[0, 1.75, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.15, 16]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      </group>
    </Float>
  )
}

function Crosshairs() {
  return (
    <group>
      {/* Horizontal line */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[6, 0.003]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
      </mesh>
      {/* Vertical line */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[0.003, 6]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
      </mesh>
      {/* Center circle */}
      <mesh position={[0, 0, -1.9]}>
        <ringGeometry args={[0.15, 0.16, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
      </mesh>
      {/* Outer circle */}
      <mesh position={[0, 0, -2]}>
        <ringGeometry args={[0.8, 0.81, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export default function ReamerModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#ffd9b3" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#ffffff"
        />
        
        <ReamerTool scale={0.85} />
        <Crosshairs />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
