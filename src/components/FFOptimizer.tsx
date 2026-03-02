import { Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface FFOptimizerProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const FFOptimizer = ({ checked, onCheckedChange }: FFOptimizerProps) => {
  const handleToggle = (val: boolean) => {
    onCheckedChange(val);
    toast.success(val ? "Aim Neck ativado!" : "Aim Neck desativado");
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up mb-1"
      style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-semibold text-base">
            Aim Neck
          </h3>
        </div>
        <Switch checked={checked} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
};
