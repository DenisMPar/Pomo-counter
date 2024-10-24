import { useGLTF } from '@react-three/drei';
import React from 'react';
import { getActiveNumberSection } from '../hooks/counter';

export function NumberModel(props) {
  const { nodes, materials } = useGLTF('/number.glb');
  const { activeNumberSection } = getActiveNumberSection(props.count);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes['cube-0'].geometry}
        position={[10.97, 14.478, 0]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[0] ? 'red' : 'black'}
        />
      </mesh>
      <mesh
        geometry={nodes['cube-1'].geometry}
        position={[10.97, 4.812, 0]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[1] ? 'red' : 'black'}
        />
      </mesh>
      <mesh
        geometry={nodes['cube-2'].geometry}
        position={[5.352, 20.286, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[2] ? 'red' : 'black'}
        />
      </mesh>
      <mesh
        geometry={nodes['cube-3'].geometry}
        position={[5.529, 9.716, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 3.647, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[3] ? 'red' : 'black'}
        />
      </mesh>
      <mesh
        geometry={nodes['cube-4'].geometry}
        position={[5.447, -1.06, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[4] ? 'red' : 'black'}
        />
      </mesh>
      <mesh
        geometry={nodes['cube-5'].geometry}
        position={[0, 14.478, 0]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[5] ? 'red' : 'black'}
        />
      </mesh>

      <mesh
        geometry={nodes['cube-6'].geometry}
        position={[0, 4.765, 0]}
        scale={[1, 3.92, 1]}
      >
        <meshStandardMaterial
          color={activeNumberSection[6] ? 'red' : 'black'}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/number.glb');
