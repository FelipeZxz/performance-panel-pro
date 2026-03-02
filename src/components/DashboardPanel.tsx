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
  const [delayActive, setDelayActive] = useState(false);
  const [neckActive, setNeckActive] = useState(false);
  const [extraActive, setExtraActive] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-md mx-auto space-y-4">

        <PerformanceMonitor maxFPS={selectedFPS} />
        <FPSBadge selectedFPS={selectedFPS} onFPSChange={setSelectedFPS} />
        <SensitivityGenerator />
        <ExtraToggles active={extraActive} onToggle={(id, val) => setExtraActive(prev => ({ ...prev, [id]: val }))} />
        <DelayOptimizer checked={delayActive} onCheckedChange={setDelayActive} />
        <FFOptimizer checked={neckActive} onCheckedChange={setNeckActive} />
        <ActionButtons onLogout={onLogout} />

      </div>
    </div>
  );
};
