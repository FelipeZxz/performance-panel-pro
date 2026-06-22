import { useState } from "react";
import { Crosshair, Target, Shield, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ToggleOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const options: ToggleOption[] = [
  { id: "precision", label: "Precision", icon: <Crosshair className="w-5 h-5 text-primary" /> },
  { id: "hs_pescoco", label: "HS Pescoço", icon: <Target className="w-5 h-5 text-primary" /> },
  { id: "bypass", label: "Bypass", icon: <Shield className="w-5 h-5 text-primary" /> },
];

interface ExtraTogglesProps {
  active: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}

export const ExtraToggles = ({ active = {}, onToggle }: ExtraTogglesProps) => {
  const [clearStatus, setClearStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleToggle = (id: string, label: string, val: boolean) => {
    onToggle(id, val);
    toast.success(val ? `${label} ativado` : `${label} desativado`);
  };

  const handleClearLogs = () => {
    if (clearStatus !== "idle") return;
    setClearStatus("loading");
    setTimeout(() => {
      setClearStatus("done");
      toast.success("Logs limpos com sucesso");
      setTimeout(() => setClearStatus("idle"), 2000);
    }, 1500);
  };

  const clearLabel =
    clearStatus === "loading"
      ? "Limpando..."
      : clearStatus === "done"
      ? "Limpo com sucesso"
      : "Limpar Logs";

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

      <div
        className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
        style={{ animationDelay: `${350 + options.length * 80}ms`, animationFillMode: "forwards" }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-primary" />
            <h3 className="text-foreground font-semibold text-base">Limpar Logs</h3>
          </div>
          <Button
            onClick={handleClearLogs}
            disabled={clearStatus !== "idle"}
            size="sm"
            className={
              clearStatus === "done"
                ? "bg-green-500 hover:bg-green-500 text-zinc-950 font-semibold"
                : ""
            }
          >
            {clearLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
