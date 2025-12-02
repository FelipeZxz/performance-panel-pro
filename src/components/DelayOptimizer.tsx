import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DelayOptimizer = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    toast.success(isActive ? "Delay desativado" : "Delay ativado!");
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up mb-1"
      style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div>
            <h3 className="text-foreground font-semibold text-base">
              Diminuir Delay
            </h3>
            <p className="text-muted-foreground text-sm">
              Reduz o delay do toque
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          size="sm"
          className={
            isActive
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              : "bg-success hover:bg-success/90 text-success-foreground"
          }
        >
          {isActive ? "Desativar" : "Ativar"}
        </Button>
      </div>

      {isActive && (
        <div className="card-gaming-inner rounded-lg px-4 py-3">
          <span className="text-green-400">0 Delay aplicado</span>
        </div>
      )}
    </div>
  );
};
