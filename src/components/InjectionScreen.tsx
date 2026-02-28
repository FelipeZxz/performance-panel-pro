import { useState, useEffect, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

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

export const InjectionScreen = ({ gameType, onComplete }: InjectionScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(fakeFiles[0]);
  const [done, setDone] = useState(false);

  const gameName = gameType === "normal" ? "Free Fire" : "Free Fire Max";

  const handleComplete = useCallback(() => {
    setDone(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  }, [onComplete]);

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
      }
      if (step >= steps) {
        clearInterval(timer);
        handleComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [done, handleComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="max-w-sm w-full px-6 text-center space-y-6">
        {!done ? (
          <>
            <h2 className="text-foreground text-xl font-bold animate-pulse">
              Injetando Arquivos...
            </h2>
            <Progress value={progress} className="h-3 bg-muted" />
            <p className="text-muted-foreground text-xs font-mono animate-pulse">
              {currentFile}
            </p>
            <p className="text-muted-foreground text-sm">
              {Math.floor(progress)}%
            </p>
          </>
        ) : (
          <div className="space-y-4 animate-scale-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-foreground text-xl font-bold">
              Injetado com sucesso!
            </h2>
            <p className="text-muted-foreground text-sm">
              Abrindo {gameName}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
