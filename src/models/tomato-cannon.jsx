import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Counter } from '../components/conter';
import { degToRad } from 'three/src/math/MathUtils.js';

export function TomatoCannon(props) {
  const { nodes, materials } = useGLTF('/tomato-cannon.glb');
  return (
    <group {...props} dispose={null} scale={0.5}>
      <group position={[9, -10.5, 69]} rotation={[0, degToRad(90), 0]}>
        <Counter />
      </group>
      <group position={[0.006, 4.844, 57.456]} scale={[8.803, 8.803, 14.304]}>
        <mesh
          geometry={nodes.catapult_1.geometry}
          material={materials['Material.009']}
        />
        <mesh
          geometry={nodes.catapult_2.geometry}
          material={materials['Material.010']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/tomato-cannon.glb');
