import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import Bubbles from "./Bubbles";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function App() {
    const { blur } = useControls({
        blur: { value: 0.1, min: 0, max: 1 }
    })

    return (
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }} camera={{ fov: 50, position: [0, 0, 20] }}>
            <color attach="background" args={['#f0f0f0']} />
            <fog attach="fog" args={['red', 20, -5]} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <Bubbles />
            <EffectComposer disableNormalPass>
                <N8AO aoRadius={6} intensity={2} color="red" />
                <TiltShift2 blur={blur} />
            </EffectComposer>
            <Environment preset="city" />
        </Canvas>
    )
}