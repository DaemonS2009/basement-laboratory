import { Environment } from '@react-three/drei'
import XMCPModel from './XmcpModel'
import { folder, useControls } from 'leva'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export default function Scene() {
  const lightingControls = useControls({
    'Scene Lighting': folder({
      enableEnvironment: {
        value: true
      },
      environmentIntensity: {
        value: 1.0,
        min: 0,
        max: 3,
        step: 0.1
      },
      directionalIntensity: {
        value: 2.0,
        min: 0,
        max: 5,
        step: 0.1
      },
      directionalPosition: {
        value: [5, 5, 5],
        min: -10,
        max: 10,
        step: 0.1
      }
    })
  })

  const Effects = () => {
    const controls = useControls({
      'Bloom Effect': folder({
        luminanceThreshold: { value: 0.07, min: 0, max: 1, step: 0.01 },
        luminanceSmoothing: { value: 0.2, min: 0, max: 1, step: 0.01 },
        bloomIntensity: { value: 0.2, min: 0, max: 10, step: 0.1 }
      })
    })

    return (
      <EffectComposer multisampling={0} stencilBuffer={true}>
        {/* <Dithering /> */}
        <Bloom
          luminanceThreshold={controls.luminanceThreshold}
          luminanceSmoothing={controls.luminanceSmoothing}
          intensity={controls.bloomIntensity}
          height={300}
        />
      </EffectComposer>
    )
  }

  return (
    <>
      {lightingControls.enableEnvironment && (
        <Environment
          preset="studio"
          environmentIntensity={lightingControls.environmentIntensity}
        />
      )}

      <directionalLight
        position={lightingControls.directionalPosition}
        intensity={lightingControls.directionalIntensity}
        color="#ffffff"
        castShadow
      />
      <ambientLight intensity={0.3} color="#404040" />
      <pointLight position={[-5, 3, 2]} intensity={1.5} color="#ffffff" />
      <XMCPModel />
      <Effects />
    </>
  )
}
