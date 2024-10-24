import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { degToRad } from 'three/src/math/MathUtils.js';

export function TomatoCan(props) {
  const { nodes, materials } = useGLTF('/tomato-can.glb');
  return (
    <group
      {...props}
      dispose={null}
      scale={0.485}
      position={[0, 5.5, -8.4]}
      rotation={[degToRad(90), 0, degToRad(90)]}
    >
      <mesh
        geometry={nodes.Cylinder_1.geometry}
        material={materials['Material.003']}
      />
      <mesh
        geometry={nodes.Cylinder_2.geometry}
        material={materials['Material.004']}
      />
    </group>
  );
}

useGLTF.preload('/tomato-can.glb');
