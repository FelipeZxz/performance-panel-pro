import { useState } from "react";
import { Wifi, RefreshCw, Zap, Target } from "lucide-react";
import { PerformanceOption } from "./PerformanceOption";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { AimTremSection } from "./AimTremSection";
import { StatusBanner } from "./StatusBanner";

export const NaxxPanel = () => {
  const [settings, setSettings] = useState({
    removeDelay: true,
    increasePerformance: true,
    eliminateStutter: true,
    mode120fps: true,
    removeShake: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="title-gradient font-display text-3xl font-bold tracking-wide">
            NaxxPanel
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Otimizador de desempenho do Free Fire
          </p>
        </div>

        {/* Performance Settings Card */}
        <div
          className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="font-semibold text-foreground">Desempenho</h2>
          </div>

          <div className="space-y-2">
            <PerformanceOption
              icon={<Wifi className="text-cyan-400" />}
              label="Remover atraso"
              checked={settings.removeDelay}
              onCheckedChange={(v) => updateSetting("removeDelay", v)}
              delay={150}
            />
            <PerformanceOption
              icon={<RefreshCw className="text-green-400" />}
              label="Aumentar o desempenho"
              checked={settings.increasePerformance}
              onCheckedChange={(v) => updateSetting("increasePerformance", v)}
              delay={200}
            />
            <PerformanceOption
              icon={<Zap className="text-yellow-400" />}
              label="Eliminar a gagueira"
              checked={settings.eliminateStutter}
              onCheckedChange={(v) => updateSetting("eliminateStutter", v)}
              delay={250}
            />
            <PerformanceOption
              icon={<Target className="text-purple-400" />}
              label="Modo 120 FPS"
              checked={settings.mode120fps}
              onCheckedChange={(v) => updateSetting("mode120fps", v)}
              delay={300}
            />
          </div>
        </div>

        {/* Performance Monitor */}
        <PerformanceMonitor />

        {/* AimTrem Section */}
        <AimTremSection
          checked={settings.removeShake}
          onCheckedChange={(v) => updateSetting("removeShake", v)}
        />

        {/* Status Banner */}
        <StatusBanner />
      </div>
    </div>
  );
};
