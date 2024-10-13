import React from 'react';
import { useGLTF } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';
import { RigidBody } from '@react-three/rapier';

export function Aro(props) {
  const { nodes, materials } = useGLTF('/aro.glb');
  return (
    <group
      {...props}
      dispose={null}
      rotation={[0, degToRad(-90), 0]}
      position={[5, 0, -5]}
    >
      <RigidBody type='fixed'>
        <group
          position={[5.153, 5.057, 3.343]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.243, 4.178, 6.323]}
        >
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials.Material}
          />
          <mesh
            geometry={nodes.Cube_2.geometry}
            material={materials['Material.001']}
          />
        </group>
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <mesh
          geometry={nodes.Torus003.geometry}
          material={materials['Material.004']}
          position={[5.153, 2.35, 6.473]}
          scale={[1.174, 1, 1.174]}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials['Material.004']}
          position={[5.153, 1.794, 3.882]}
          scale={[0.849, 0.616, 0.379]}
        />
      </RigidBody>
      <RigidBody type='kinematicVelocity' colliders='trimesh'>
        <mesh
          geometry={nodes.net.geometry}
          material={nodes.net.material}
          position={[5.153, -0.748, 6.473]}
          rotation={[-Math.PI, 0, 0]}
          scale={-1.601}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/aro.glb');
