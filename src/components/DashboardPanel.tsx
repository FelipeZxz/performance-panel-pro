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
          <h1 className="title-gradient font-display text-2xl font-bold tracking-wide">
            SnTx
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Otimizador de desempenho do Free Fire
          </p>
        </div>

        {/* Performance Monitor - TOP */}
        <PerformanceMonitor maxFPS={selectedFPS} />

        {/* FPS Badge - with selection */}
        <FPSBadge selectedFPS={selectedFPS} onFPSChange={setSelectedFPS} />

        {/* Sensitivity Generator */}
        <SensitivityGenerator />

        {/* Delay Optimizer */}
        <DelayOptimizer />

        {/* FF Optimizer */}
        <FFOptimizer />

        {/* Action Buttons */}
        <ActionButtons onLogout={onLogout} />

        {/* Status Banner */}
        <div
          className="status-banner rounded-xl py-3 px-4 flex items-center justify-center gap-2 opacity-0 animate-slide-up animate-pulse-glow"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-foreground/90 text-sm font-medium">
            Acesso autorizado! Bem-vindo ao NaxxPanel
          </span>
        </div>
      </div>
    </div>
  );
};
