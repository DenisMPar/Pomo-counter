export function CansMachine() {
  return (
    <>
      <RigidBody type='fixed' colliders='trimesh'>
        <mesh
          geometry={nodes['machine-hopper'].geometry}
          material={materials['Material.005']}
          position={[0.143, 21.273, -30.085]}
          scale={[2.521, 1.94, 2.465]}
        />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <mesh
          geometry={nodes['machine-body'].geometry}
          material={materials['Material.003']}
          position={[0.11, 7.593, -25.666]}
          scale={[10.107, 6.427, 10.107]}
        />
      </RigidBody>
      <RigidBody
        type='dynamic'
        colliders='hull'
        ref={tapaHopperRef}
        gravityScale={10}
      >
        <mesh
          geometry={nodes['tapa-hopper'].geometry}
          material={materials['Material.005']}
          position={[0.346, 13.224, -28.288]}
          scale={[2.775, 0.076, 4.667]}
        />
      </RigidBody>
    </>
  );
}
