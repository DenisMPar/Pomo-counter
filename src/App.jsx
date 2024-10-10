import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Experience';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';

function App() {
  return (
    <Canvas shadows camera={{ position: [4, 4, 4], fov: 30 }}>
      <color attach='background' args={['#ececec']} />
      <Suspense>
        <Physics>
          <Scene />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;
