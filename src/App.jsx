import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { HtmlComponent } from './components/html';

function App() {
  return (
    <>
      <HtmlComponent />
      <Canvas shadows camera={{ position: [10, 45, 0], fov: 40 }}>
        <color attach='background' args={['#ececec']} />
        <Suspense>
          <Physics debug>
            <Scene />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
