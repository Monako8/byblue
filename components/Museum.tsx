'use client'
import { Canvas } from '@react-three/fiber'
import { PointerLockControls, Sky } from '@react-three/drei'

// Компонент для одной картины
function Painting({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[2, 2, 0.1]} /> {/* Рамка картины */}
      <meshStandardMaterial color="white" /> {/* Сюда позже добавим вашу текстуру */}
    </mesh>
  )
}

export default function Museum() {
  const WALL_COLOR = "#87CEEB"; // Тот самый чисто голубой

  return (
    <Canvas camera={{ position: [0, 1.6, 0] }} shadows>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 0]} intensity={1} />

      {/* ПОЛ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* ЧЕТЫРЕ СТЕНЫ */}
      {/* Задняя */}
      <mesh position={[0, 2.5, -10]}><boxGeometry args={[20, 6, 0.2]} /><meshStandardMaterial color={WALL_COLOR} /></mesh>
      {/* Передняя */}
      <mesh position={[0, 2.5, 10]}><boxGeometry args={[20, 6, 0.2]} /><meshStandardMaterial color={WALL_COLOR} /></mesh>
      {/* Левая */}
      <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI/2, 0]}><boxGeometry args={[20, 6, 0.2]} /><meshStandardMaterial color={WALL_COLOR} /></mesh>
      {/* Правая */}
      <mesh position={[10, 2.5, 0]} rotation={[0, Math.PI/2, 0]}><boxGeometry args={[20, 6, 0.2]} /><meshStandardMaterial color={WALL_COLOR} /></mesh>

      {/* РАЗВЕСКА КАРТИН (Примеры) */}
      <Painting position={[-4, 1.5, -9.8]} rotation={[0, 0, 0]} />
      <Painting position={[0, 1.5, -9.8]} rotation={[0, 0, 0]} />
      <Painting position={[4, 1.5, -9.8]} rotation={[0, 0, 0]} />

      <PointerLockControls />
    </Canvas>
  )
}