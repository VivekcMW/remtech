"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import type { ProductCategory } from "@/types"

function getProfilePoints(category: ProductCategory): THREE.Vector2[] {
  switch (category) {
    case "reamer":
      return [
        new THREE.Vector2(0.00, -3.00),
        new THREE.Vector2(0.05, -2.93),
        new THREE.Vector2(0.09, -2.40),
        new THREE.Vector2(0.13, -0.70),
        new THREE.Vector2(0.11, -0.42),
        new THREE.Vector2(0.095, -0.20),
        new THREE.Vector2(0.095,  2.80),
        new THREE.Vector2(0.00,  2.80),
      ]
    case "multistep":
      return [
        new THREE.Vector2(0.00, -3.00),
        new THREE.Vector2(0.05, -2.93),
        new THREE.Vector2(0.09, -2.20),
        new THREE.Vector2(0.13, -1.20),
        new THREE.Vector2(0.11, -0.90),
        new THREE.Vector2(0.17, -0.60),
        new THREE.Vector2(0.17, -0.10),
        new THREE.Vector2(0.11,  0.10),
        new THREE.Vector2(0.095, 0.30),
        new THREE.Vector2(0.095, 2.80),
        new THREE.Vector2(0.00,  2.80),
      ]
    case "boring":
      return [
        new THREE.Vector2(0.00, -3.00),
        new THREE.Vector2(0.16, -2.88),
        new THREE.Vector2(0.18, -2.50),
        new THREE.Vector2(0.14, -2.10),
        new THREE.Vector2(0.09, -1.80),
        new THREE.Vector2(0.09,  2.80),
        new THREE.Vector2(0.00,  2.80),
      ]
    case "milling":
      return [
        new THREE.Vector2(0.00, -2.00),
        new THREE.Vector2(0.07, -1.95),
        new THREE.Vector2(0.38, -1.50),
        new THREE.Vector2(0.40, -0.50),
        new THREE.Vector2(0.40, -0.10),
        new THREE.Vector2(0.14,  0.10),
        new THREE.Vector2(0.10,  0.30),
        new THREE.Vector2(0.10,  2.20),
        new THREE.Vector2(0.00,  2.20),
      ]
    case "pcd":
      return [
        new THREE.Vector2(0.00, -2.80),
        new THREE.Vector2(0.19, -2.68),
        new THREE.Vector2(0.21, -2.30),
        new THREE.Vector2(0.19, -1.90),
        new THREE.Vector2(0.12, -1.60),
        new THREE.Vector2(0.095, -1.40),
        new THREE.Vector2(0.095,  2.80),
        new THREE.Vector2(0.00,  2.80),
      ]
  }
}

const categoryAccent: Record<ProductCategory, { key: string; rim: string; fill: string }> = {
  reamer:    { key: "#f97316", rim: "#f97316", fill: "#4466ff" },
  boring:    { key: "#f43f5e", rim: "#f43f5e", fill: "#22aaff" },
  milling:   { key: "#10b981", rim: "#10b981", fill: "#f97316" },
  pcd:       { key: "#a855f7", rim: "#c084fc", fill: "#fb923c" },
  multistep: { key: "#f97316", rim: "#f97316", fill: "#4466ff" },
}

function RendererSetup() {
  const { gl } = useThree()
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [gl])
  return null
}

function Particles() {
  const count = 50
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#f97316" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

interface ToolMeshProps {
  category: ProductCategory
  transitioning: boolean
}

function ToolMesh({ category, transitioning }: ToolMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  const geometry = useMemo(() => {
    const pts = getProfilePoints(category)
    const geo = new THREE.LatheGeometry(pts, 64)
    geo.computeVertexNormals()
    return geo
  }, [category])

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return
    meshRef.current.rotation.y += delta * 0.35
    const target = transitioning ? 0 : 1
    matRef.current.opacity += (target - matRef.current.opacity) * 0.12
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow>
      <meshStandardMaterial
        ref={matRef}
        color="#c0ccd4"
        metalness={0.82}
        roughness={0.18}
        transparent
        opacity={1}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

interface SceneProps {
  category: ProductCategory
  transitioning: boolean
}

function Scene({ category, transitioning }: SceneProps) {
  const accent = categoryAccent[category]

  return (
    <>
      <RendererSetup />
      <color attach="background" args={["#060608"]} />

      {/* Studio environment for metallic reflections — no background */}
      <Environment preset="warehouse" background={false} />

      <ambientLight intensity={0.15} />

      {/* Key light — category accent from top-front-right */}
      <pointLight position={[4, 6, 3]} color={accent.key} intensity={200} distance={30} decay={2} />

      {/* Fill — cool from left */}
      <pointLight position={[-5, 2, 3]} color={accent.fill} intensity={60} distance={22} decay={2} />

      {/* Rim — warm from behind below */}
      <pointLight position={[0, -5, -4]} color={accent.rim} intensity={100} distance={20} decay={2} />

      {/* Top white for specular cap */}
      <directionalLight position={[0, 8, 3]} intensity={0.5} color="#ffffff" />

      <ToolMesh category={category} transitioning={transitioning} />
      <Particles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.06}
        enableDamping
        maxPolarAngle={Math.PI * 0.78}
        minPolarAngle={Math.PI * 0.22}
      />
    </>
  )
}

interface ToolCanvasProps {
  category: ProductCategory
  transitioning: boolean
}

export default function ToolCanvas({ category, transitioning }: ToolCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene category={category} transitioning={transitioning} />
    </Canvas>
  )
}
