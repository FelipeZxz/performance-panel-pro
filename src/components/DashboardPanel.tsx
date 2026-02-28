import { useState } from "react";
import { FPSBadge } from "./FPSBadge";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { SensitivityGenerator } from "./SensitivityGenerator";
import { DelayOptimizer } from "./DelayOptimizer";
import { FFOptimizer } from "./FFOptimizer";
import { ExtraToggles } from "./ExtraToggles";
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
            Wink Painel
          </h1>
        </div>

        <PerformanceMonitor maxFPS={selectedFPS} />
        <FPSBadge selectedFPS={selectedFPS} onFPSChange={setSelectedFPS} />
        <SensitivityGenerator />
        <ExtraToggles />
        <DelayOptimizer />
        <FFOptimizer />
        <ActionButtons onLogout={onLogout} />

      </div>
    </div>
  );
};
