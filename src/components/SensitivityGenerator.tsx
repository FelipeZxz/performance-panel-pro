import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SensitivityLevel = "baixa" | "media" | "alta";

export const SensitivityGenerator = () => {
  const [level, setLevel] = useState<SensitivityLevel>("media");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Sensibilidade gerada com sucesso!");
    }, 1500);
  };

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
    >
      <h3 className="text-foreground font-semibold text-base mb-3">
        Gerador de Sensibilidade
      </h3>

      <p className="text-muted-foreground text-sm mb-3">Nível</p>

      <div className="flex gap-2 mb-4">
        {[
          { key: "baixa", label: "Baixa" },
          { key: "media", label: "Média" },
          { key: "alta", label: "Alta" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setLevel(item.key as SensitivityLevel)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300",
              level === item.key
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isGenerating ? "Gerando..." : "Gerar Sensibilidade"}
      </Button>
    </div>
  );
};
