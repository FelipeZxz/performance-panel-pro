import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const FFOptimizer = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  const handleToggle = () => {
    setIsOptimized((prev) => {
      toast.success(!prev ? "Aim Neck ativado!" : "Aim Neck desativado");
      return !prev;
    });
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

        <Button
          onClick={handleToggle}
          size="sm"
          className={
            isOptimized
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              : "bg-success hover:bg-success/90 text-success-foreground"
          }
        >
          {isOptimized ? "Desativar" : "Ativar"}
        </Button>
      </div>
    </div>
  );
};