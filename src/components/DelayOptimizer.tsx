import { useState, useRef } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DelayOptimizer = () => {
  const [isActive, setIsActive] = useState(false);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 350);
    setIsActive((prev) => {
      toast.success(!prev ? "Delay ativado!" : "Delay desativado");
      return !prev;
    });
  };

  return (
    <div
      ref={cardRef}
      className={`card-gaming rounded-xl p-4 opacity-0 animate-slide-up mb-1 ${animating ? "animate-toggle-activate" : ""}`}
      style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-semibold text-base">
            Diminuir Delay
          </h3>
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
        <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2 mt-3 animate-status-in">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary">Aplicado</span>
        </div>
      )}
    </div>
  );
};
