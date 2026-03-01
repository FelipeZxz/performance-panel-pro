import { useState } from "react";
import { Shield, Timer, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const options: ToggleOption[] = [
  {
    id: "bypass",
    label: "Bypass",
    icon: <Shield className="w-5 h-5 text-primary" />,
  },
  {
    id: "input-lag",
    label: "Diminuir Input Lag",
    icon: <Timer className="w-5 h-5 text-primary" />,
  },
  {
    id: "optimize",
    label: "Otimizar Dispositivo",
    icon: <Smartphone className="w-5 h-5 text-primary" />,
  },
];

export const ExtraToggles = () => {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string, label: string) => {
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
          className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
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
        </div>
      ))}
    </div>
  );
};