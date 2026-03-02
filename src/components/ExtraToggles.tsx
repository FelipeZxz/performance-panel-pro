import { Shield, Timer, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const options: ToggleOption[] = [
  { id: "bypass", label: "Bypass", icon: <Shield className="w-5 h-5 text-primary" /> },
  { id: "delay", label: "Diminuir Delay", icon: <Timer className="w-5 h-5 text-primary" /> },
  { id: "optimize", label: "Otimizar Dispositivo", icon: <Smartphone className="w-5 h-5 text-primary" /> },
];

interface ExtraTogglesProps {
  active: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}

export const ExtraToggles = ({ active = {}, onToggle }: ExtraTogglesProps) => {
  const handleToggle = (id: string, label: string, val: boolean) => {
    onToggle(id, val);
    toast.success(val ? `${label} ativado` : `${label} desativado`);
  };

  return (
    <div className="space-y-4">
      {options.map((opt, i) => (
        <div
          key={opt.id}
          className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
          style={{ animationDelay: `${350 + i * 80}ms`, animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {opt.icon}
              <h3 className="text-foreground font-semibold text-base">{opt.label}</h3>
            </div>
            <Switch
              checked={!!active[opt.id]}
              onCheckedChange={(val) => handleToggle(opt.id, opt.label, val)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
