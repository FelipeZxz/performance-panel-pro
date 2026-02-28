import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
}

const options: ToggleOption[] = [
  { id: "bypass", label: "Bypass" },
  { id: "input-lag", label: "Diminuir Input Lag" },
  { id: "optimize", label: "Otimizar Dispositivo" },
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
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
    >
      <h3 className="text-foreground font-semibold text-base mb-3">
        Opções Extras
      </h3>
      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex items-center justify-between card-gaming-inner rounded-lg p-3"
          >
            <span className="text-sm text-foreground">{opt.label}</span>
            <Switch
              checked={!!active[opt.id]}
              onCheckedChange={() => handleToggle(opt.id, opt.label)}
              className="switch-gaming"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
