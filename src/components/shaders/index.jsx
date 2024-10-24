import { extend } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

export const GlowShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new Vector2() },
    emissiveColor: { value: [1.0, 0.5, 0.0] }, // Naranja
  },
  vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform vec3 emissiveColor;
      uniform float uTime;
      
      void main() {
        // Definimos los dos colores: naranja y blanco
        vec3 orangeColor = emissiveColor;  // Naranja
         vec3 softOrangeColor = vec3(1.0, 0.8, 0.5);      // Blanco
  
        // Oscilación suave entre 0 y 1 usando sin
        float intensity = sin(uTime * 5.0) * 0.5 + 0.5;
  
        // Mezclamos naranja y blanco según la intensidad
        vec3 finalColor = mix(orangeColor, softOrangeColor, intensity);
  
        // Aplicamos el color mezclado con la intensidad variable
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
};

extend({ GlowShaderMaterial: ShaderMaterial });
