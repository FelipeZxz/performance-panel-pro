import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SensitivityLevel = "baixa" | "media" | "alta";

interface SensitivityResult {
  geral: number;
  pontoVermelho: number;
  mira2x: number;
  mira4x: number;
  miraAwm: number;
  olhadinha: number;
  Dpi: number;
}

// Função que gera DPI fora da lógica principal
const generateDPI = (level: SensitivityLevel): number => {
  if (level === "baixa") return Math.floor(500 + Math.random() * (596 - 500));
  if (level === "media") return Math.floor(596 + Math.random() * (720 - 596));
  return Math.floor(720 + Math.random() * (960 - 720));
};

const generateSensitivity = (level: SensitivityLevel): SensitivityResult => {
  const ranges = {
    baixa: { min: 150, max: 175 },
    media: { min: 175, max: 185 },
    alta: { min: 185, max: 200 },
  };

  const { min, max } = ranges[level];
  const random = () => Math.floor(min + Math.random() * (max - min));

  return {
    geral: random(),
    pontoVermelho: random(),
    mira2x: random(),
    mira4x: random(),
    miraAwm: random(),
    olhadinha: random(),
    Dpi: generateDPI(level), // DPI ALTERADA E INDEPENDENTE
  };
};

export const SensitivityGenerator = () => {
  const [level, setLevel] = useState<SensitivityLevel>("media");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SensitivityResult | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const sensitivity = generateSensitivity(level);
      setResult(sensitivity);
      setIsGenerating(false);
      toast.success("Sensibilidade gerada com sucesso!");
    }, 1500);
  };

  const handleLevelChange = (newLevel: SensitivityLevel) => {
    setLevel(newLevel);
    setResult(null); // 🔥 limpa a sensibilidade antiga automaticamente
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
            onClick={() => handleLevelChange(item.key as SensitivityLevel)}
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

      {result && (
        <div className="mt-4 space-y-2">
          <div className="card-gaming-inner rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Geral:</span>
              <span className="text-primary font-semibold">{result.geral}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ponto Vermelho:</span>
              <span className="text-primary font-semibold">
                {result.pontoVermelho}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mira 2x:</span>
              <span className="text-primary font-semibold">{result.mira2x}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mira 4x:</span>
              <span className="text-primary font-semibold">{result.mira4x}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mira AWM:</span>
              <span className="text-primary font-semibold">{result.miraAwm}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Olhadinha:</span>
              <span className="text-primary font-semibold">{result.olhadinha}</span>
            </div>

            {/* DPI aparece separada como você pediu */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">DPI:</span>
              <span className="text-primary font-semibold">{result.Dpi}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
