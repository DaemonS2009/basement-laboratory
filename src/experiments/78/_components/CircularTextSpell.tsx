import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { folder, useControls } from 'leva'

type Variation = {
  sizeMultiplier: number
  opacityMultiplier: number
  yOffset: number
  rotationOffset: number
}

type CreateInstancesProps = {
  count: number
  radius: number
  fontSize: number
  variations: Variation[]
  verticalOffset: number
  color: string
  isRandomVariation: boolean
  rotationX: number
  rotationZ: number
  spiralTurns: number
  spiralDirection: number
  minY: number
  maxY: number
}

const createInstances = ({
  count,
  radius,
  fontSize,
  variations,
  verticalOffset,
  color,
  isRandomVariation,
  rotationX,
  rotationZ,
  spiralTurns,
  spiralDirection,
  minY,
  maxY
}: CreateInstancesProps) => {
  const textInstances: React.JSX.Element[] = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    const progressRatio = i / count
    const spiralY = minY + progressRatio * (maxY - minY)
    const helixOffset =
      Math.sin(progressRatio * spiralTurns * Math.PI * 2 * spiralDirection) *
      0.2

    const variation = isRandomVariation ? variations[i] || variations[0] : null
    const finalFontSize = variation
      ? fontSize * variation.sizeMultiplier
      : fontSize

    const finalY =
      verticalOffset +
      spiralY +
      helixOffset +
      (variation ? variation.yOffset * 0.1 : 0)

    textInstances.push(
      <Text
        key={i}
        font="/fonts/adhesion/Adhesion-Regular.woff"
        fontSize={finalFontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={[x, finalY, z]}
        rotation={[
          rotationX,
          -angle + Math.PI / 2 + (variation ? variation.rotationOffset : 0),
          rotationZ
        ]}
        letterSpacing={0.1}
      >
        Ship
      </Text>
    )
  }

  return textInstances
}

export default function CircularTextSpell() {
  const groupRef = useRef<THREE.Group>(null)

  const controls = useControls({
    'Circular Text': folder({
      color: {
        value: '#383838',
        label: 'Color'
      },
      radius: {
        value: 1.9,
        min: 0,
        max: 20,
        step: 0.1
      },
      count: {
        value: 46,
        min: 1,
        max: 100,
        step: 1
      },
      fontSize: {
        value: 0.15,
        min: 0.1,
        max: 1,
        step: 0.05
      },
      opacity: {
        value: 0.05,
        min: 0,
        max: 1,
        step: 0.01
      },
      rotationSpeed: {
        value: 0.5,
        min: -2,
        max: 2,
        step: 0.1
      },
      verticalOffset: {
        value: -2.3,
        min: -5,
        max: 5,
        step: 0.1
      },
      variation: {
        value: false,
        label: 'Add Variation'
      },
      rotationX: {
        value: 0,
        min: -180,
        max: 180,
        step: 1
      },

      rotationZ: {
        value: 45,
        min: -180,
        max: 180,
        step: 1
      },
      spiralHeight: {
        value: 1.5,
        min: 0,
        max: 10,
        step: 0.1,
        label: 'Spiral Height'
      },
      spiralTurns: {
        value: 1.2,
        min: 0.5,
        max: 5,
        step: 0.1,
        label: 'Spiral Turns'
      },
      spiralDirection: {
        value: 1,
        min: -1,
        max: 1,
        step: 0.2,
        label: 'Spiral Direction'
      },
      minY: {
        value: 3,
        min: -10,
        max: 10,
        step: 0.1,
        label: 'Min Y Position'
      },
      maxY: {
        value: 0.7,
        min: -10,
        max: 10,
        step: 0.1,
        label: 'Max Y Position'
      }
    })
  })

  const variations: Variation[] = useMemo(() => {
    return Array.from({ length: controls.count }, () => ({
      sizeMultiplier: 0.8 + Math.random() * 0.4,
      opacityMultiplier: 0.7 + Math.random() * 0.6,
      yOffset: (Math.random() - 0.5) * 3,
      rotationOffset: (Math.random() - 0.5) * 0.2
    }))
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += Math.sin(controls.rotationSpeed * 0.01)
  })

  const textInstances = createInstances({
    count: controls.count,
    radius: controls.radius,
    fontSize: controls.fontSize,
    variations,
    verticalOffset: controls.verticalOffset,
    color: controls.color,
    isRandomVariation: controls.variation,
    rotationX: controls.rotationX,
    rotationZ: controls.rotationZ,
    spiralTurns: controls.spiralTurns,
    spiralDirection: controls.spiralDirection,
    minY: controls.minY,
    maxY: controls.maxY
  })

  return <group ref={groupRef}>{textInstances}</group>
}
