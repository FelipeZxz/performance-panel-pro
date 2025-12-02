import { useState } from "react";
import { FPSBadge } from "./FPSBadge";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { SensitivityGenerator } from "./SensitivityGenerator";
import { DelayOptimizer } from "./DelayOptimizer";
import { FFOptimizer } from "./FFOptimizer";
import { ActionButtons } from "./ActionButtons";

interface DashboardPanelProps {
  onLogout: () => void;
}

export const DashboardPanel = ({ onLogout }: DashboardPanelProps) => {
  const [selectedFPS, setSelectedFPS] = useState<60 | 120>(60);

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div
          className="text-center mb-4 opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards" }}
        >
          <h1 className="font-display text-2xl font-bold tracking-wide bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            SnTx
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Otimizador de desempenho do Free Fire
          </p>
        </div>

        {/* Performance Monitor */}
        <PerformanceMonitor maxFPS={selectedFPS} />

        {/* FPS Selector */}
        <FPSBadge selectedFPS={selectedFPS} onFPSChange={setSelectedFPS} />

        {/* Sensitivity Generator */}
        <SensitivityGenerator />

        {/* Delay Optimizer */}
        <DelayOptimizer />

        {/* FF Optimizer */}
        <FFOptimizer />

        {/* Buttons */}
        <ActionButtons onLogout={onLogout} />

        {/* Status Banner - Red Neon */}
        <div
          className="
            rounded-xl py-3 px-4 flex items-center justify-center gap-2 
            opacity-0 animate-slide-up animate-pulse-glow
            border border-red-600/40
          "
          style={{
            background:
              "linear-gradient(90deg, rgba(60,0,0,0.5) 0%, rgba(90,0,0,0.5) 50%, rgba(60,0,0,0.5) 100%)",
            animationDelay: "700ms",
            animationFillMode: "forwards",
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-foreground/90 text-sm font-medium">
            Acesso autorizado! Bem-vindo ao SnTx
          </span>
        </div>
      </div>
    </div>
  );
};
