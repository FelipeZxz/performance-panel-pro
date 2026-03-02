import { useState } from "react";
import { FPSBadge } from "./FPSBadge";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { SensitivityGenerator } from "./SensitivityGenerator";
import { ExtraToggles } from "./ExtraToggles";
import { ActionButtons } from "./ActionButtons";

interface DashboardPanelProps {
  onLogout: () => void;
}

export const DashboardPanel = ({ onLogout }: DashboardPanelProps) => {
  const [selectedFPS, setSelectedFPS] = useState<60 | 120>(60);
  const [extraActive, setExtraActive] = useState<Record<string, boolean>>({});
  const [injecting, setInjecting] = useState(false);

  return (
    <div className={`min-h-screen bg-background py-6 px-4 transition-all duration-500 ${injecting ? 'blur-md pointer-events-none select-none' : ''}`}>
      <div className="max-w-md mx-auto space-y-4">
        <PerformanceMonitor maxFPS={selectedFPS} />
        <FPSBadge selectedFPS={selectedFPS} onFPSChange={setSelectedFPS} />
        <SensitivityGenerator />
        <ExtraToggles active={extraActive} onToggle={(id, val) => setExtraActive(prev => ({ ...prev, [id]: val }))} />
        <ActionButtons onLogout={onLogout} onInjectStart={() => setInjecting(true)} onInjectEnd={() => setInjecting(false)} />
      </div>
    </div>
  );
};
