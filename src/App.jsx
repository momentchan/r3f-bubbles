import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import Bubbles from "./Bubbles";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import Utilities from "./r3f-gist/utility/Utilities";
import { useControls } from "leva";

export default function App() {
    // const { blur } = useControls({
    //     blur: { value: 0.1, min: 0, max: 1 }
    // })

    return (
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }} camera={{ fov: 50, position: [0, 0, 20] }} gl={{ preserveDrawingBuffer: true }}>
            <color attach="background" args={['#f0f0f0']} />
            <fog attach="fog" args={['red', 50, -5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <Bubbles />
            <EffectComposer disableNormalPass>
                <N8AO aoRadius={6} intensity={2} color="red" />
                <TiltShift2 blur={0.1} />
            </EffectComposer>
            <Environment preset="city" />

            <Utilities />
        </Canvas>
    )
}