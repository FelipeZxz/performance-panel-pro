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
      className="
        rounded-xl p-4 opacity-0 animate-slide-up border border-red-700/30
        bg-[linear-gradient(135deg,#0a0a0a,#1a0000,#0a0a0a)]
        shadow-[0_0_10px_rgba(255,0,0,0.15)]
      "
      style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]" />
          <div>
            <h3 className="text-red-400 font-semibold text-base drop-shadow-[0_0_4px_rgba(255,0,0,0.5)]">
              Otimizar FF
            </h3>
            <p className="text-red-900 text-sm">Reduz travamentos</p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          size="sm"
          className={
            isOptimized
              ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_8px_rgba(255,0,0,0.5)]"
              : "bg-red-900 hover:bg-red-800 text-red-400 shadow-[0_0_8px_rgba(255,0,0,0.3)]"
          }
        >
          {isOptimized ? "Desativar" : "Ativar"}
        </Button>
      </div>

      <div
        className="
          rounded-lg px-4 py-3 flex items-center gap-2
          bg-[rgba(40,0,0,0.45)] border border-red-800/30
          shadow-[inset_0_0_10px_rgba(255,0,0,0.2)]
        "
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOptimized
              ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.7)]"
              : "bg-red-900"
          }`}
        />
        <span className={isOptimized ? "text-red-400" : "text-red-800"}>
          {isOptimized ? "Otimizado!" : "Desativado"}
        </span>
      </div>
    </div>
  );
};
