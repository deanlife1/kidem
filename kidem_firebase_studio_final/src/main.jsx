import React, { Suspense, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import './styles.css'

function Orb({ color, scale, position }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const start = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  useCursor(hovered || dragging)

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.42,
    metalness: 0.08,
  }), [color])

  useFrame((state, delta) => {
    if (!ref.current) return
    if (!dragging) {
      ref.current.rotation.x += delta * 0.18
      ref.current.rotation.y += delta * 0.26
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.08
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh
        ref={ref}
        position={position}
        scale={scale}
        material={material}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => {
          setDragging(true)
          start.current = { x: e.clientX, y: e.clientY, rx: ref.current.rotation.x, ry: ref.current.rotation.y }
          e.target.setPointerCapture?.(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!dragging || !ref.current) return
          const dx = (e.clientX - start.current.x) * 0.01
          const dy = (e.clientY - start.current.y) * 0.01
          ref.current.rotation.y = start.current.ry + dx
          ref.current.rotation.x = start.current.rx + dy
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <dodecahedronGeometry args={[1, 1]} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.8], fov: 35 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#f1ebfb"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 7]} intensity={2.2} color="#f8f4ff" />
      <directionalLight position={[-4, -2, -2]} intensity={0.45} color="#9c7ed9" />
      <Suspense fallback={null}>
        <group>
          <Orb color="#d9b8ff" scale={1.65} position={[-1.8, 0.8, 0.4]} />
          <Orb color="#f1d7ff" scale={1.1} position={[1.55, -0.55, 0.1]} />
          <Orb color="#c9a4ff" scale={0.92} position={[0.1, -1.35, -0.1]} />
        </group>
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}

function App() {
  return (
    <main className="page">
      <header className="nav glass">
        <div className="logo">KIDEM</div>
        <nav><a href="#story">story</a><a href="#collection">collection</a><a href="#cta" className="nav__cta">buy now</a></nav>
      </header>
      <section className="hero">
        <div className="hero__copy">
          <p className="kicker">it's about to happen</p>
          <h1>좋은 일이<br/>곧 시작됩니다</h1>
          <p className="sub">유럽 빈티지의 깊이와 조용한 고급감, 그리고 손으로 만지는 듯한 3D 물성으로 Kidem의 세계를 만듭니다.</p>
          <div className="actions"><a href="#collection" className="btn solid">collection</a><a href="#story" className="btn ghost">brand story</a></div>
          <ul className="meta"><li><strong>3d</strong><span>engine hero</span></li><li><strong>glass</strong><span>soft ui</span></li><li><strong>drag</strong><span>rotate</span></li></ul>
        </div>
        <div className="hero__scene"><Scene /></div>
      </section>
      <section className="ticker"><div className="ticker__track">vintage mood · quiet luxury · european design · tactile surfaces · curated living · vintage mood · quiet luxury · european design · tactile surfaces · curated living</div></section>
      <section className="section" id="story"><div className="section__head"><p className="kicker">brand story</p><h2>Kidem은 어떤 일이 일어나다는 뜻입니다</h2><p className="lead">좋은 일이 일어나는 순간을 공간과 오브제로 번역합니다. 설명보다 먼저 분위기가 느껴지도록, 색과 질감과 텍스트의 온도를 하나로 맞췄습니다.</p></div></section>
      <section className="section" id="collection"><div className="section__head"><p className="kicker">collection</p><h2>빈티지하지만 멋스러운 선택</h2></div><div className="cards"><article className="card"><h3>object</h3><p>공간의 중심이 되는 조형 오브제.</p></article><article className="card"><h3>table</h3><p>테이블 위 리듬을 바꾸는 소품.</p></article><article className="card"><h3>living</h3><p>일상을 조용히 바꾸는 리빙 오브제.</p></article></div></section>
      <section className="section" id="cta"><div className="cta"><p className="kicker">buy now</p><h2>당신의 공간에 좋은 일이 일어나도록</h2><p>키뎀의 큐레이션은 당신의 다음 장면을 준비합니다.</p><a className="btn solid" href="#top">top</a></div></section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)