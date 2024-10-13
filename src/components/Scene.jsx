import { Box, OrbitControls, Sphere, Torus } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Aro } from '../models/aro';
import { BasketField } from '../models/field';

export const Scene = () => {
  const [balls, setBalls] = useState([{ id: 1 }]);
  const ballRefs = useRef([]);

  // useEffect(() => {
  //   if (balls.length > 0) {
  //     const lastBallIndex = balls.length - 1;
  //     const lastBallRef = ballRefs.current[lastBallIndex];
  //     setTimeout(() => {
  //       lastBallRef.applyImpulse({ x: 0, y: -15, z: 0 });
  //     }, 800);
  //   }
  //   const timer = setTimeout(() => {
  //     addBall();
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [balls]);

  const addBall = () => {
    setBalls((prevBalls) => [...prevBalls, { id: prevBalls.length + 1 }]);
  };
  const impulse = () => {
    const lastBallIndex = balls.length - 1;

    const lastBallRef = ballRefs.current[lastBallIndex];
    console.log(lastBallRef);

    lastBallRef.applyImpulse({ x: 0, y: 20, z: -13 });
  };
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} />
      <OrbitControls />

      {balls.map((ball, index) => (
        <RigidBody
          key={ball.id}
          colliders='cuboid'
          ref={(el) => (ballRefs.current[index] = el)}
          restitution={0.2}
          gravityScale={5}
        >
          <Sphere position={[0, 3, 28]} args={[0.4, 10, 10]}>
            <meshStandardMaterial color={'orange'} />
          </Sphere>
        </RigidBody>
      ))}
      <RigidBody type='fixed'>
        <Box position={[-5, 5, 0]} onClick={impulse}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[-10, 5, 0]} onClick={addBall}>
          <meshStandardMaterial color={'blue'} />
        </Box>
      </RigidBody>
      <BasketField />
    </>
  );
};
