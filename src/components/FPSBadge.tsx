import { useState, useEffect } from "react";

export const FPSBadge = () => {
  const [fps, setFps] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(115 + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full rounded-xl py-3 px-4 text-center font-semibold opacity-0 animate-fade-in"
      style={{
        background: "linear-gradient(135deg, hsl(25, 60%, 35%) 0%, hsl(25, 70%, 40%) 100%)",
        animationFillMode: "forwards",
      }}
    >
      <span className="text-primary">{fps} FPS Ativado</span>
    </div>
  );
};
