import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';

function App() {
  return (
    <Canvas shadows camera={{ position: [10, 45, 0], fov: 40 }}>
      <color attach='background' args={['#ececec']} />
      <Suspense>
        <Physics debug>
          <Scene />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;
