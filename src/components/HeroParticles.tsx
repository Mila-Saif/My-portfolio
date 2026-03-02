"use client";

import React, { useMemo } from "react";

/**
 * Ambient floating glowing particles for the hero section.
 * Uses pure CSS animations — no canvas, no Three.js.
 */
export default function HeroParticles() {
    const particles = useMemo(() => {
        const colors = [
            "rgba(0,229,255,0.5)",   // cyan
            "rgba(123,47,190,0.5)",  // purple
            "rgba(26,60,255,0.4)",   // blue
            "rgba(0,200,255,0.4)",   // light cyan
            "rgba(75,0,130,0.4)",    // indigo
            "rgba(0,229,255,0.3)",   // soft cyan
            "rgba(123,47,190,0.3)",  // soft purple
        ];

        return Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: 1 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 8,
            duration: 4 + Math.random() * 6,
            driftX: -30 + Math.random() * 60,
            driftY: -30 + Math.random() * 60,
        }));
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes particleFloat {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    15% {
                        opacity: 1;
                    }
                    50% {
                        transform: translate(var(--dx), var(--dy)) scale(1.5);
                        opacity: 0.7;
                    }
                    85% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                }
            `}</style>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            >
                {particles.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: "absolute",
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            borderRadius: "50%",
                            backgroundColor: p.color,
                            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}`,
                            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                            ["--dx" as string]: `${p.driftX}px`,
                            ["--dy" as string]: `${p.driftY}px`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
