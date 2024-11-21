import {
  Box,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TomatoCan } from '../models/can';
import { BasketField } from '../models/field';
import { Tomato } from '../models/tomato';
import { TomatoBox } from '../models/tomato-box';
import { GlowShaderMaterial } from './shaders';
import { NumberModel } from '../models/number';
import { Counter } from './conter';
import { CansMachine } from '../models/cans-machine';
import { Pusher } from '../models/pusher';
import { TomatoCannon } from '../models/tomato-cannon';

export const Scene = () => {
  const [balls, setBalls] = useState([{ id: 1, handle: 0 }]);
  const [cans, setCans] = useState([]);
  const [tomatoBoxes, setTomatoBoxes] = useState([
    {
      id: 1,
    },
  ]);
  const [closedBox, setClosedBox] = useState(false);
  const ballRefs = useRef([]);
  const canRefs = useRef([]);
  const materialRef = useRef();
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

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
  const addCan = () => {
    setCans((prevCans) => [...prevCans, { id: prevCans.length + 1 }]);
  };
  const impulse = () => {
    const lastBallIndex = balls.length - 1;
    const lastBallRef = ballRefs.current[lastBallIndex];
    lastBallRef.wakeUp();
    lastBallRef.applyImpulse({ x: 0, y: 180, z: -85 });
  };
  const impulseCan = () => {
    const lastCanIndex = cans.length - 1;
    const lastCanRefs = canRefs.current[lastCanIndex];
    lastCanRefs.applyImpulse({ x: 0, y: 0, z: 1 });
  };
  function closeBox() {
    setClosedBox(true);
    setCans([]);
  }
  function handleIntersection(event) {
    const rigidBody = event.rigidBody;
    const isBodyTomato = ballRefs.current.find(
      (ref) => ref?.handle === rigidBody?.handle
    );
    if (isBodyTomato) {
      const newBalls = balls.filter((ball) => ball.handle !== rigidBody.handle);
      setBalls(newBalls);
    }
  }

  function setReference({ ref, index, ball }) {
    ballRefs.current[index] = ref;
    setBalls((prevBalls) => {
      const modifyedBall = prevBalls.find((b) => b.id === ball.id);
      modifyedBall.handle = ref.handle;
      return [...prevBalls];
    });
  }
  function handleAddTomatoBox() {
    if (tomatoBoxes.length === 0) {
      setClosedBox(false);
      setTomatoBoxes([
        {
          id: 1,
        },
      ]);
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} />
      <OrbitControls target={[-30, 0, -10]} />
      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport
          axisColors={['red', 'green', 'blue']}
          labelColor='black'
        />
      </GizmoHelper>
      <CuboidCollider
        args={[1.5, 0.5, 1.5]}
        sensor={true}
        onIntersectionEnter={handleIntersection}
        position={[0, 3, -14.8]}
      />
      <CuboidCollider
        args={[10, 1, 10]}
        sensor={true}
        position={[-57, 1, 0.3]}
        rotation={[0, 0, degToRad(90)]}
        onIntersectionEnter={() => setTomatoBoxes([])}
      />

      {/* <Plane
        args={[25, 15]}
        position={[-53.1, 4, 0.3]}
        rotation={[0, degToRad(90), 0]}
      >
        <shaderMaterial
          ref={materialRef}
          attach='material'
          uniforms={GlowShaderMaterial.uniforms}
          vertexShader={GlowShaderMaterial.vertexShader}
          fragmentShader={GlowShaderMaterial.fragmentShader}
        />
      </Plane> */}

      {balls.map((ball, index) => (
        <RigidBody
          key={ball.id}
          colliders='ball'
          ref={(ref) => setReference({ ref, index, ball })}
          restitution={0}
          gravityScale={6}
        >
          <Tomato />
        </RigidBody>
      ))}
      <RigidBody type='fixed'>
        <Box position={[-5, 5, 0]} onClick={impulse}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[-5, 13, 0]} onClick={closeBox}>
          <meshStandardMaterial color={'yellow'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[-5, 8, 0]} onClick={addCan}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[-5, 12, 0]} onClick={impulseCan}>
          <meshStandardMaterial color={'pink'} />
        </Box>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[-10, 5, 0]} onClick={addBall}>
          <meshStandardMaterial color={'blue'} />
        </Box>
      </RigidBody>
      <BasketField />
      {cans.map((can, index) => (
        <RigidBody
          key={can.id}
          type='dynamic'
          colliders='hull'
          gravityScale={6}
        >
          <TomatoCan />
        </RigidBody>
      ))}
      {tomatoBoxes.map((box, index) => (
        <TomatoBox closed={closedBox} />
      ))}
      <Counter />
      <CansMachine />
      <Pusher handleAddTomatoBox={handleAddTomatoBox} />
      <TomatoCannon />
    </>
  );
};
