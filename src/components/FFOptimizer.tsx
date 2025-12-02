import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const FFOptimizer = () => {
  const [isOptimized, setIsOptimized] = useState(false);

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
            <p className="text-muted-foreground text-sm">Reduz travamentos</p>
          </div>
        </div>

        {/* Botão vermelho quando desligado / cinza quando ligado */}
        <Button
          onClick={handleToggle}
          size="sm"
          className={
            isOptimized
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_6px_rgba(255,0,0,0.6)]"
          }
        >
          {isOptimized ? "Desativar" : "Ativar"}
        </Button>
      </div>

      {/* Exibe apenas quando estiver ativado */}
      {isOptimized && (
        <div className="card-gaming-inner rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400">Otimizado!</span>
        </div>
      )}
    </div>
  );
};
