import React, { useEffect, useRef } from 'react';
import { Box, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useThree } from '@react-three/fiber';

export function TomatoBox(props) {
  const { nodes, materials } = useGLTF('/box.glb');
  const coverRef = useRef(null);
  const boxRef = useRef(null);
  const { rapier, world } = useRapier();
  useEffect(() => {
    if (props.closed && coverRef.current && boxRef.current) {
      const body1 = world.getRigidBody(coverRef.current.handle);
      const body2 = world.getRigidBody(boxRef.current.handle);

      // Crear una descripción del fixed joint.
      const jointParams = rapier.JointData.fixed(
        { x: 0, y: 1.5, z: 0 }, // anchor1 en (0, 0, 0)
        { x: 0, y: 0, z: 0, w: 1 }, // frame1 con rotación neutra (cuaternión de identidad)
        { x: 0, y: 1.5, z: 0 }, // anchor2 en (0, 0, 0)
        { x: 0, y: 0, z: 0, w: 1 } // frame2 con rotación neutra (cuaternión de identidad)
      );
      world.createImpulseJoint(jointParams, body1, body2);
      boxRef.current.lockRotations(true);
    }
  }, [props.closed, coverRef, boxRef, rapier, world]);
  useEffect(() => {
    if (props.closed) {
      boxRef.current.lockTranslations(true, true);
      boxRef.current.lockRotations(true, true);
      setTimeout(() => {
        boxRef.current.lockTranslations(false, false);
        boxRef.current.lockRotations(false, false);
      }, 500);
    }
  }, [props.closed]);

  return (
    <group {...props} dispose={null} scale={0.5}>
      <RigidBody type='dynamic' colliders='trimesh' ref={boxRef}>
        <mesh
          geometry={nodes.Box.geometry}
          material={materials['Material.006']}
          position={[0.32, 1.6, 1.784]}
          scale={[1.74, 2.214, 7.338]}
        />
      </RigidBody>
      {props.closed && (
        <RigidBody type='dynamic' ref={coverRef}>
          <mesh
            geometry={nodes['Box-cover'].geometry}
            material={materials['Material.006']}
            position={[0.5, 4, 1.722]}
            scale={[1.864, 0.198, 7.459]}
          />
        </RigidBody>
      )}
    </group>
  );
}

useGLTF.preload('/box.glb');
