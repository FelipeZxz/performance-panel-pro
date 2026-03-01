import { useState, useRef } from "react";
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
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToggle = (id: string, label: string) => {
    const el = cardRefs.current[id];
    if (el) {
      el.classList.remove("animate-toggle-activate");
      void el.offsetWidth;
      el.classList.add("animate-toggle-activate");
    }
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
          ref={(el) => { cardRefs.current[opt.id] = el; }}
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

          {active[opt.id] && (
            <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2 mt-3 animate-status-in">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400">{opt.activeText}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
