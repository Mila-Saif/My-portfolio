"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback, Component } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Error Boundary                                                    */
/* ------------------------------------------------------------------ */

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ButterflyScene error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

/* ------------------------------------------------------------------ */
/*  Glass circle cursor that follows the mouse with reflect effect    */
/* ------------------------------------------------------------------ */

function GlassCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const cursor = cursorRef.current;
        if (!container || !cursor) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursor.style.transform = `translate(${x - 22}px, ${y - 22}px)`;
        };

        const handleEnter = () => setVisible(true);
        const handleLeave = () => setVisible(false);

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleEnter);
        container.addEventListener("mouseleave", handleLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleEnter);
            container.removeEventListener("mouseleave", handleLeave);
        };
    }, [containerRef]);

    return (
        <div
            ref={cursorRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 44,
                height: 44,
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 50,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.25s ease",
                background: `
                    radial-gradient(
                        circle at 35% 30%,
                        rgba(255,255,255,0.35) 0%,
                        rgba(0,229,255,0.15) 30%,
                        rgba(123,47,190,0.08) 60%,
                        transparent 70%
                    )
                `,
                border: "1.5px solid rgba(0,229,255,0.45)",
                boxShadow: `
                    0 0 12px rgba(0,229,255,0.2),
                    0 0 24px rgba(123,47,190,0.1),
                    inset 0 0 8px rgba(255,255,255,0.1)
                `,
                backdropFilter: "blur(2px) brightness(1.3) saturate(1.2)",
                WebkitBackdropFilter: "blur(2px) brightness(1.3) saturate(1.2)",
            }}
        >
            {/* Reflection highlight */}
            <div
                style={{
                    position: "absolute",
                    top: 5,
                    left: 8,
                    width: 12,
                    height: 8,
                    borderRadius: "50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
                    transform: "rotate(-25deg)",
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Butterfly plane                                                   */
/* ------------------------------------------------------------------ */

function ButterflyPlane({ onHoverChange }: { onHoverChange: (hovered: boolean) => void }) {
    const meshRef = useRef<THREE.Mesh>(null);

    const texture = useLoader(THREE.TextureLoader, "/butterfly.png");

    useMemo(() => {
        if (texture) {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
        }
    }, [texture]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uTime: { value: 0 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec4 texColor = texture2D(uTexture, vUv);
          float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
          float alpha = 1.0 - smoothstep(0.85, 0.95, luminance);
          
          if (texColor.r > 0.9 && texColor.g > 0.9 && texColor.b > 0.9) {
            alpha = 0.0;
          }
          
          vec3 color = texColor.rgb * 1.1;
          gl_FragColor = vec4(color, alpha * texColor.a);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
    }, [texture]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4;
            const t = state.clock.getElapsedTime();
            const scale = 1 + Math.sin(t * 0.8) * 0.03;
            meshRef.current.scale.set(scale, scale, scale);
        }
        if (material) {
            material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    const handlePointerOver = useCallback(() => onHoverChange(true), [onHoverChange]);
    const handlePointerOut = useCallback(() => onHoverChange(false), [onHoverChange]);

    return (
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
            <mesh
                ref={meshRef}
                material={material}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <planeGeometry args={[4.5, 5.7]} />
            </mesh>
        </Float>
    );
}

/* ------------------------------------------------------------------ */
/*  Glow particles — spread on hover                                 */
/* ------------------------------------------------------------------ */

function GlowParticles({ hovered }: { hovered: boolean }) {
    const pointsRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    const basePositions = useRef<Float32Array | null>(null);
    const animatedPositions = useRef<Float32Array | null>(null);

    const { positions, colors } = useMemo(() => {
        const count = 80;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color("#7B2FBE"),
            new THREE.Color("#00C8FF"),
            new THREE.Color("#1A3CFF"),
            new THREE.Color("#00E5FF"),
            new THREE.Color("#4B0082"),
        ];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.5 + Math.random() * 2.0;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.3) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useEffect(() => {
        if (geometryRef.current) {
            basePositions.current = new Float32Array(positions);
            animatedPositions.current = new Float32Array(positions);
            geometryRef.current.setAttribute("position", new THREE.BufferAttribute(animatedPositions.current, 3));
            geometryRef.current.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        }
    }, [positions, colors]);

    const spreadFactor = useRef(1.0);

    useFrame((state, delta) => {
        const target = hovered ? 2.5 : 1.0;
        spreadFactor.current += (target - spreadFactor.current) * delta * 1.5;

        if (basePositions.current && animatedPositions.current && geometryRef.current) {
            const count = basePositions.current.length / 3;
            for (let i = 0; i < count; i++) {
                animatedPositions.current[i * 3] = basePositions.current[i * 3] * spreadFactor.current;
                animatedPositions.current[i * 3 + 1] = basePositions.current[i * 3 + 1] * spreadFactor.current;
                animatedPositions.current[i * 3 + 2] = basePositions.current[i * 3 + 2] * spreadFactor.current;
            }
            const posAttr = geometryRef.current.getAttribute("position");
            if (posAttr) (posAttr as THREE.BufferAttribute).needsUpdate = true;
        }

        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={hovered ? 0.06 : 0.04}
                vertexColors
                transparent
                opacity={hovered ? 0.85 : 0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                             */
/* ------------------------------------------------------------------ */

function Scene({ onHoverChange, hovered }: { onHoverChange: (h: boolean) => void; hovered: boolean }) {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <pointLight position={[-3, 2, 2]} intensity={1.0} color="#7B2FBE" distance={10} />
            <pointLight position={[3, -1, 3]} intensity={1.0} color="#00E5FF" distance={10} />
            <ButterflyPlane onHoverChange={onHoverChange} />
            <GlowParticles hovered={hovered} />
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                */
/* ------------------------------------------------------------------ */

export default function ButterflyScene() {
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <ErrorBoundary>
            <div
                ref={containerRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    cursor: hovered ? "none" : "default",
                    background: "transparent",
                }}
            >
                <GlassCursor containerRef={containerRef} />
                <Canvas
                    gl={{
                        alpha: true,
                        antialias: true,
                        preserveDrawingBuffer: true,
                    }}
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    style={{ background: "transparent" }}
                    dpr={[1, 2]}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0);
                    }}
                >
                    <React.Suspense fallback={null}>
                        <Scene onHoverChange={setHovered} hovered={hovered} />
                    </React.Suspense>
                </Canvas>
            </div>
        </ErrorBoundary>
    );
}
