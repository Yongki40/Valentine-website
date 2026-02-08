"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;      // %
  size: number;      // px
  duration: number;  // s
  delay: number;     // s
  opacity: number;
  rotate: number;    // deg
};

export default function HeartConfetti() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const count = 22;
    const next = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 18,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 3,
      opacity: 0.35 + Math.random() * 0.35,
      rotate: Math.random() * 40 - 20,
    }));
    setHearts(next);
  }, []);

  const emojis = ["💗", "💕", "💖", "💘", "💞"];

  // Render nothing until client generates hearts (prevents mismatch)
  if (hearts.length === 0) return null;

  return (
    <div className="heartConfetti" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heartConfettiItem"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            transform: `rotate(${h.rotate}deg)`,
          }}
        >
          {emojis[h.id % emojis.length]}
        </span>
      ))}
    </div>
  );
}
