import React, { useRef, useState } from 'react';
import { Box, useGLTF } from '@react-three/drei';
import { useMoveAndReset } from '../hooks/movement';
import { RigidBody } from '@react-three/rapier';

export function Pusher(props) {
  const { nodes, materials } = useGLTF('/pusher.glb');
  const pusherRef = useRef();

  const [isReseting, setIsReseting] = useState(false);
  const { move: MovePusher, reset: ResetPusher } = useMoveAndReset({
    ref: pusherRef,
    maxPosition: { x: -40 },
    resetPosition: { x: 0 },
    lockRotations: true,
    lockTranslationsOnReset: false,
  });

  return (
    <group {...props} dispose={null} scale={0.5}>
      <RigidBody type='fixed' colliders='trimesh'>
        <Box
          onClick={() => MovePusher({ x: -180, y: 0, z: 0 })}
          args={[3, 3, 3]}
          position={[-30, 5, 30]}
        >
          <meshStandardMaterial color={'#a1a1a1'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <Box
          onClick={() => ResetPusher({ x: 100, y: 0, z: 0 })}
          args={[3, 3, 3]}
          position={[-15, 5, 35]}
        >
          <meshStandardMaterial color={'#db6e6e'} />
        </Box>
      </RigidBody>

      <RigidBody
        type='dynamic'
        colliders='cuboid'
        ref={pusherRef}
        gravityScale={3}
        onSleep={() => {
          const position = pusherRef.current.translation();
          if (position.x >= 0) {
            props.handleAddTomatoBox();
          }
        }}
      >
        <mesh
          geometry={nodes.pusher.geometry}
          material={materials['Material.012']}
          position={[20.417, 1.203, 1.922]}
          scale={[0.377, 1.528, 9.668]}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/pusher.glb');
