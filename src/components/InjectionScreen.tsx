import { useState, useEffect, useCallback, useMemo } from "react";
import { Progress } from "@/components/ui/progress";

interface InjectionScreenProps {
  gameType: "normal" | "max";
  onComplete: () => void;
}

const fakeFiles = [
  "aimbot.td", "trick.nb", "headshot_cfg.dll", "recoil_patch.sys",
  "anti_ban.module", "wall_render.fx", "speed_boost.drv", "aim_assist.bin",
  "config_loader.dat", "memory_patch.hex", "gfx_enhance.shader",
  "hitbox_mod.cfg", "net_optimizer.tcp", "fps_unlock.reg", "skin_loader.pkg",
  "bypass_shield.enc", "macro_engine.lib", "crosshair_custom.ui",
  "damage_mod.val", "final_inject.exe",
];

interface Particle {
  id: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
}

export const InjectionScreen = ({ gameType, onComplete }: InjectionScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(fakeFiles[0]);
  const [done, setDone] = useState(false);
  const [fileHistory, setFileHistory] = useState<string[]>([]);

  const gameName = gameType === "normal" ? "Free Fire" : "Free Fire Max";

  // Memoize particles so they don't re-randomize on every render
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []
  );

  const handleComplete = useCallback(() => {
    setDone(true);
  }, []);

  useEffect(() => {
    if (done) return;
    const totalDuration = 6000;
    const steps = fakeFiles.length;
    const interval = totalDuration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const newProgress = Math.min((step / steps) * 100, 100);
      setProgress(newProgress);
      if (step < steps) {
        setCurrentFile(fakeFiles[step]);
        setFileHistory((prev) => [...prev.slice(-4), fakeFiles[step]]);
      }
      if (step >= steps) {
        clearInterval(timer);
        handleComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [done, handleComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
      {/* Animated background particles - smooth drift */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${p.startX}%`,
              top: `${p.startY}%`,
              animation: `particle-drift ${p.duration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-sm w-full px-6 text-center space-y-6 relative z-10">
        {!done ? (
          <>
            <h2 className="text-foreground text-xl font-bold">
              Injetando Arquivos
            </h2>

            {/* Progress bar with smooth transition */}
            <div className="relative">
              <Progress value={progress} className="h-3 bg-muted [&>div]:transition-[transform] [&>div]:duration-700 [&>div]:ease-out" />
              <div
                className="absolute top-0 left-0 h-3 rounded-full pointer-events-none"
                style={{
                  width: `${progress}%`,
                  transition: "width 700ms ease-out",
                  boxShadow: "0 0 15px hsl(235 86% 65% / 0.6)",
                }}
              />
            </div>

            <p className="text-primary text-lg font-bold">
              {Math.floor(progress)}%
            </p>

            {/* File history with staggered opacity */}
            <div className="space-y-1 min-h-[80px]">
              {fileHistory.map((file, i) => (
                <p
                  key={`${file}-${i}`}
                  className="text-muted-foreground text-xs font-mono transition-opacity duration-300"
                  style={{
                    opacity: 0.3 + (i / fileHistory.length) * 0.7,
                  }}
                >
                  {i === fileHistory.length - 1 ? "▸ " : "  "}
                  {file}
                </p>
              ))}
            </div>

            {/* Current file highlight */}
            <div className="card-gaming-inner rounded-lg px-4 py-2 inline-block">
              <p className="text-primary text-xs font-mono animate-pulse">
                Injetando: {currentFile}
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h2
              className="text-primary text-2xl font-bold"
              style={{
                animation: "fade-in 0.5s ease-out 0.3s both",
              }}
            >
              Injetado com sucesso
            </h2>
            <p
              className="text-muted-foreground text-sm"
              style={{
                animation: "fade-in 0.5s ease-out 0.5s both",
              }}
            >
              Abra o {gameName}
            </p>
            <p
              className="text-muted-foreground text-xs mt-2"
              style={{ animation: "fade-in 0.5s ease-out 0.7s both" }}
            >
              auxílio rodando em segundo plano!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
