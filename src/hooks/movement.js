import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';

/**
 * Suma dos números.
 *
 * @param {ref} ref - El elemento al que se le aplicará la fuerza.
 * @param {maxPosition} maxPosition { x: number} | { y: number } | { z: number } - La posición maxima.
 * @param {resetPosition} resetPosition { x: number } | { y: number } | { z: number } - La posicion inicial a la que debe volver en el reset
 * @param {lockRotations} lockRotations - boolean - Si se debe bloquear las rotaciones
 * @returns {move, reset} move(force), reset(force) - force:{ x: number, y: number, z: number } - Funciones para mover y resetear el elemento
 *
 */
export function useMoveAndReset({
  ref,
  maxPosition,
  resetPosition,
  lockRotations,
  onReset,
}) {
  const [action, setAction] = useState(null);

  function move(force) {
    setAction('move');
    ref.current.lockRotations(lockRotations);
    ref.current.wakeUp(true);
    ref.current.addForce(force, true);
  }
  function reset(force) {
    setAction('reset');
    ref.current.lockRotations(lockRotations);
    ref.current.wakeUp(true);
    ref.current.addForce(force, true);
  }
  //hook to check position and stop movement
  useFrame(() => {
    if (ref.current) {
      const currentPosition = ref.current.translation();
      const maxPositionAxis = Object.keys(maxPosition)[0];
      const resetPositionAxis = Object.keys(resetPosition)[0];

      const currentPositionOnMaxAxis = currentPosition[maxPositionAxis];
      const currentPositionOnResetAxis = currentPosition[resetPositionAxis];

      const maxPositionValue = maxPosition[maxPositionAxis];
      const resetPositionValue = resetPosition[resetPositionAxis];

      const isMaxPositionPositive = maxPosition[maxPositionAxis] >= 0;
      const isResetPositionPositive = resetPosition[maxPositionAxis] >= 0;

      const reachedMaxPosition = isMaxPositionPositive
        ? currentPositionOnMaxAxis >= maxPositionValue
        : currentPositionOnMaxAxis <= maxPositionValue;

      const reachedResetPosition = isResetPositionPositive
        ? currentPositionOnResetAxis >= resetPositionValue
        : currentPositionOnResetAxis <= resetPositionValue;

      if (reachedMaxPosition && action === 'move') {
        ref.current.resetForces(true);
        ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        ref.current.sleep();
      }
      if (reachedResetPosition && action === 'reset') {
        ref.current.resetForces(true);
        ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        ref.current.sleep();
      }
    }
  });

  return { move, reset };
}
