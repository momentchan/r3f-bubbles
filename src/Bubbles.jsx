import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

const particles = Array.from({ length: 150 }, () => ({
    factor: MathUtils.randInt(20, 100),
    speed: MathUtils.randFloat(0.01, 0.75),
    xFactor: MathUtils.randFloatSpread(40),
    yFactor: MathUtils.randFloatSpread(10),
    zFactor: MathUtils.randFloatSpread(10)
}))



export default function Bubbles() {
    const ref = useRef()
    useFrame((state, delta) => void (ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)))

    return (
        <Instances limit={particles.length} ref={ref} castShadow receiveShadow position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.45, 64, 64]} />
            <meshStandardMaterial roughness={1} color="#f0f0f0" />
            {particles.map((data, i) => (
                <Bubble key={i} {...data} />
            ))}
        </Instances>
    )
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
    const ref = useRef()
    useFrame((state) => {
        const t = factor + state.clock.elapsedTime * (speed / 2)
        ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5))
        ref.current.position.set(
            Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
            Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
            Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 4
        )
    })
    return <Instance ref={ref} />
}