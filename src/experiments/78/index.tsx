'use client'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from './_components/scene'

import { R3FCanvasLayout } from '~/components/layout/r3f-canvas-layout'
import { OrbitControls } from '@react-three/drei'

function DitheringScene() {
  return (
    <>
      {/* Set a dark background to contrast with the dithering */}
      <color attach="background" args={['#111111']} />
      <OrbitControls enableDamping enableZoom={true} enableRotate={false} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </>
  )
}

DitheringScene.Layout = R3FCanvasLayout
DitheringScene.Title = '78. Metallic Dithering'
DitheringScene.Description = 'A metallic shader with ordered dithering effect'

export default DitheringScene
