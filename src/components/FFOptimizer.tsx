import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const FFOptimizer = () => {
  const [isOptimized, setIsOptimized] = useState(true);

  const handleToggle = () => {
    setIsOptimized(!isOptimized);
    toast.success(isOptimized ? "Otimização desativada" : "Otimização ativada!");
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div>
            <h3 className="text-foreground font-semibold text-base">
              Otimizar FF
            </h3>
            <p className="text-muted-foreground text-sm">Reduz Travamentos</p>
          </div>
        </div>
        <Button
          onClick={handleToggle}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isOptimized ? "Desativar" : "Ativar"}
        </Button>
      </div>

      <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOptimized ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          }`}
        />
        <span className={isOptimized ? "text-green-400" : "text-muted-foreground"}>
          {isOptimized ? "Otimizado!" : "Desativado"}
        </span>
      </div>
    </div>
  );
};
