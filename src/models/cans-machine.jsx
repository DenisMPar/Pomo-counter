import React, { useEffect, useRef } from 'react';
import { Box, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMoveAndReset } from '../hooks/movement';
import { Counter } from '../components/conter';
import { degToRad } from 'three/src/math/MathUtils.js';

export function CansMachine(props) {
  const { nodes, materials } = useGLTF('/cans-machine.glb');
  const tapaHopperRef = useRef();
  const { move: MoveTapaHopper, reset: ResetTapaHopper } = useMoveAndReset({
    ref: tapaHopperRef,
    maxPosition: { z: 2.6 },
    resetPosition: { z: -0.3 },
    lockRotations: true,
  });
  useEffect(() => {
    tapaHopperRef.current.lockRotations(true);
  }, []);
  return (
    <group {...props} dispose={null} scale={0.5}>
      <RigidBody type='fixed' colliders='trimesh'>
        <Box
          onClick={() => MoveTapaHopper({ x: 0, y: 0, z: 800 })}
          args={[3, 3, 3]}
          position={[-20, 5, 30]}
        >
          <meshStandardMaterial color={'#111111'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <Box
          onClick={() => ResetTapaHopper({ x: 0, y: 0, z: -60 })}
          args={[3, 3, 3]}
          position={[-20, 5, 35]}
        >
          <meshStandardMaterial color={'#00f1bd'} />
        </Box>
      </RigidBody>
      <group position={[10.5, -9.5, -29]} rotation={[0, degToRad(90), 0]}>
        <Counter />
      </group>
      <RigidBody type='fixed' colliders='trimesh'>
        <mesh
          geometry={nodes['machine-body'].geometry}
          material={materials['Material.003']}
          position={[0.11, 7.593, -25.666]}
          scale={[10.107, 6.427, 10.107]}
        />
      </RigidBody>

      <RigidBody type='fixed' colliders='trimesh'>
        <mesh
          geometry={nodes['machine-hopper'].geometry}
          material={materials['Material.005']}
          position={[0.143, 21.273, -30.085]}
          scale={[2.521, 1.94, 2.465]}
        />
      </RigidBody>
      <RigidBody
        type='dynamic'
        colliders='hull'
        ref={tapaHopperRef}
        gravityScale={10}
      >
        <mesh
          geometry={nodes['tapa-hopper'].geometry}
          material={materials['Material.005']}
          position={[0.346, 13.224, -28.288]}
          scale={[2.775, 0.076, 4.667]}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/cans-machine.glb');
