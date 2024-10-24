import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Tomato(props) {
  const { nodes, materials } = useGLTF('/tomato.glb');
  return (
    <group {...props} dispose={null} position={[0, 3, 28]} scale={0.5}>
      <mesh
        geometry={nodes.tomato.geometry}
        material={materials['Material.002']}
        position={[-0.334, 1.894, 0]}
        scale={[1.582, 1.344, 1.344]}
      />
      <mesh
        geometry={nodes.leafs.geometry}
        material={materials['Material.001']}
        position={[-0.318, 3.02, -0.023]}
        scale={[0.2, 0.13, 0.2]}
      />
    </group>
  );
}

useGLTF.preload('/tomato.glb');
