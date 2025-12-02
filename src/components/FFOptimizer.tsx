import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Zap } from "lucide-react";

export const FFOptimizer = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    toast.success(isActive ? "Otimização desativada!" : "FF otimizado!");
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" />
          <div>
            <h3 className="text-foreground font-semibold text-base">
              Otimizar FF
            </h3>
            <p className="text-muted-foreground text-sm">
              Reduz travamentos
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          size="sm"
          className={
            isActive
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }
        >
          {isActive ? "Desativar" : "Ativar"}
        </Button>
      </div>

      <div className="card-gaming-inner rounded-lg px-4 py-2">
        <span className={isActive ? "text-green-400" : "text-muted-foreground"}>
          {isActive ? "Otimização ativa" : "Padrão"}
        </span>
      </div>
    </div>
  );
};
