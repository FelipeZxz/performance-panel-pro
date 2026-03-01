import { useState } from "react";
import { Shield, Timer, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeText: string;
}

const options: ToggleOption[] = [
  {
    id: "bypass",
    label: "Bypass",
    icon: <Shield className="w-5 h-5 text-primary" />,
    activeText: "Ativado!",
  },
  {
    id: "input-lag",
    label: "Diminuir Input Lag",
    icon: <Timer className="w-5 h-5 text-primary" />,
    activeText: "Ativado!",
  },
  {
    id: "optimize",
    label: "Otimizar Dispositivo",
    icon: <Smartphone className="w-5 h-5 text-primary" />,
    activeText: "Ativado!",
  },
];

export const ExtraToggles = () => {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleToggle = (id: string, label: string) => {
    setAnimatingId(id);
    setTimeout(() => setAnimatingId(null), 350);
    setActive((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast.success(next[id] ? `${label} ativado` : `${label} desativado`);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {options.map((opt, i) => (
        <div
          key={opt.id}
          className={`card-gaming rounded-xl p-4 opacity-0 animate-slide-up ${animatingId === opt.id ? "animate-toggle-activate" : ""}`}
          style={{
            animationDelay: `${350 + i * 80}ms`,
            animationFillMode: "forwards",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {opt.icon}
              <h3 className="text-foreground font-semibold text-base">
                {opt.label}
              </h3>
            </div>

            <Button
              onClick={() => handleToggle(opt.id, opt.label)}
              size="sm"
              className={
                active[opt.id]
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  : "bg-success hover:bg-success/90 text-success-foreground"
              }
            >
              {active[opt.id] ? "Desativar" : "Ativar"}
            </Button>
          </div>

          {active[opt.id] && (
            <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2 mt-3 animate-status-in">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary">{opt.activeText}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
