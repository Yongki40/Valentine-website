type Heart = {
  left: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
  key: number;
};

export default function FloatingHearts() {
  const emojis = ["💗", "💖", "💕", "💞", "💘"];

  const hearts: Heart[] = Array.from({ length: 18 }).map((_, i) => {
    const left = (i * 7) % 100;
    const duration = 10 + (i % 7) * 2;
    const delay = (i % 6) * 0.8;
    const size = 14 + (i % 6) * 3;
    const emoji = emojis[i % emojis.length];

    return { left, duration, delay, size, emoji, key: i };
  });

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.key}
          className="heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
