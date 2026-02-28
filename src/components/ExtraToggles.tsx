import { useState } from "react";
import { Shield, Timer, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  activeText: string;
}

const options: ToggleOption[] = [
  {
    id: "bypass",
    label: "Bypass",
    description: "Ignora proteções do jogo",
    icon: <Shield className="w-5 h-5 text-yellow-400" />,
    activeText: "Ativo!",
  },
  {
    id: "input-lag",
    label: "Diminuir Input Lag",
    description: "Reduz o atraso de entrada",
    icon: <Timer className="w-5 h-5 text-yellow-400" />,
    activeText: "Aplicado!",
  },
  {
    id: "optimize",
    label: "Otimizar Dispositivo",
    description: "Melhora performance geral",
    icon: <Smartphone className="w-5 h-5 text-yellow-400" />,
    activeText: "Otimizado!",
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
    <div className="space-y-1">
      {options.map((opt, i) => (
        <div
          key={opt.id}
          className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
          style={{
            animationDelay: `${350 + i * 80}ms`,
            animationFillMode: "forwards",
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              {opt.icon}
              <div>
                <h3 className="text-foreground font-semibold text-base">
                  {opt.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {opt.description}
                </p>
              </div>
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
            <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2 animate-fade-in">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400">{opt.activeText}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
