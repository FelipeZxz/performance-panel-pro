import { FPSBadge } from "./FPSBadge";
import { SensitivityGenerator } from "./SensitivityGenerator";
import { DelayOptimizer } from "./DelayOptimizer";
import { FFOptimizer } from "./FFOptimizer";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { ActionButtons } from "./ActionButtons";

interface DashboardPanelProps {
  onLogout: () => void;
}

export const DashboardPanel = ({ onLogout }: DashboardPanelProps) => {
  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div
          className="text-center mb-4 opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards" }}
        >
          <h1 className="title-gradient font-display text-2xl font-bold tracking-wide">
            NaxxPanel
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Otimizador de desempenho do Free Fire
          </p>
        </div>

        {/* FPS Badge */}
        <FPSBadge />

        {/* Sensitivity Generator */}
        <SensitivityGenerator />

        {/* Delay Optimizer */}
        <DelayOptimizer />

        {/* FF Optimizer */}
        <FFOptimizer />

        {/* Performance Monitor */}
        <PerformanceMonitor />

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
