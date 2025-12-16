import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full gradient-water"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            bottom: "-50px",
            animation: `bubble-rise ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
