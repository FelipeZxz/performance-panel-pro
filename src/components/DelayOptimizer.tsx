import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DelayOptimizer = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
    toast.success(isActive ? "Delay ativado" : "Delay removido!");
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-foreground font-semibold text-base">
            Diminuir Delay
          </h3>
          <p className="text-muted-foreground text-sm">Reduz o delay do toque</p>
        </div>
        <Button
          onClick={handleToggle}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isActive ? "Desativar" : "Ativar"}
        </Button>
      </div>

      <div className="card-gaming-inner rounded-lg px-4 py-3">
        <span className={isActive ? "text-green-400" : "text-primary"}>
          {isActive ? "0 Delay" : "Delay Padrão"}
        </span>
      </div>
    </div>
  );
};
