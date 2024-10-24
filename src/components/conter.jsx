import { Box, Plane } from '@react-three/drei';
import { NumberModel } from '../models/number';
import { useEffect, useState } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';

export function Counter() {
  const [count, setCount] = useState(8888);
  const stringCount = String(count);
  const stringWithCeros =
    stringCount.length < 4 ? stringCount.padStart(4, '0') : stringCount;
  return (
    <group position={[0, 20, 0]} scale={0.1}>
      <Box
        position={[100, 0, 0]}
        args={[9, 9, 9]}
        onClick={() => setCount(count + 1)}
      >
        <meshStandardMaterial color={'violet'} />
      </Box>
      <Box
        position={[26, 10, -2]}
        rotation={[degToRad(90), 0, 0]}
        args={[74, 2, 40]}
      >
        <meshStandardMaterial color={'black'} />
      </Box>
      <NumberModel position={[0, 0, 0]} count={Number(stringWithCeros[0])} />;
      <NumberModel position={[15, 0, 0]} count={Number(stringWithCeros[1])} />;
      <NumberModel position={[30, 0, 0]} count={Number(stringWithCeros[2])} />
      <NumberModel position={[45, 0, 0]} count={Number(stringWithCeros[3])} />
    </group>
  );
}
