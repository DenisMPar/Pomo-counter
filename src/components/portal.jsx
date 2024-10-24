import { useFrame } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import { useEffect, useRef } from 'react';

export function Portal() {
  const { world, rapier } = useRapier();
  const portalRef = useRef();

  // Crear el collider del portal como sensor
  useEffect(() => {
    const portalCollider = world.createCollider(
      rapier.ColliderDesc.cuboid(1.5, 0.5, 1.5)
        .setTranslation(0, 5, -14.8)
        .setSensor(true)
    );
    portalRef.current = portalCollider;
    return () => {
      world.removeCollider(portalCollider);
    };
  });

  // Detectar colisiones
  useFrame(() => {
    if (portalRef.current) {
      const events = portalRef.current.intersections();
      events.forEach((event) => {
        if (event.collider) {
          const rigidBody = event.collider.rigidBody();
          console.log('Un RigidBody ha atravesado el portal:', rigidBody);
          // Aquí puedes agregar la lógica de tu portal
        }
      });
    }
  });

  return null; // El portal en sí podría ser invisible, ya que el trigger es lo importante.
}
