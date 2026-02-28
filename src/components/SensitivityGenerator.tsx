import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SensitivityResult {
  geral: number;
  pontoVermelho: number;
  mira2x: number;
  mira4x: number;
  miraAwm: number;
  olhadinha: number;
  Dpi?: number;
}

const brandModels: Record<string, string[]> = {
  apple: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14", "iPhone 13", "iPhone SE"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy A34", "Galaxy A14", "Galaxy M14", "Galaxy Z Fold 5"],
  xiaomi: ["Redmi Note 13 Pro", "Redmi Note 12", "Redmi A2", "Poco X6 Pro", "Poco F5", "Poco M6 Pro", "Mi 14", "Mi 13T Pro", "Redmi Note 8", "Redmi 13C"],
  motorola: ["Edge 40 Pro", "Edge 40", "Moto G84", "Moto G73", "Moto G54", "Moto G34", "Moto G24", "Moto E22", "Moto G200", "Moto G Stylus"],
  outro: ["Dispositivo Genérico"],
};

const generateSensitivity = (brand: string): SensitivityResult => {
  const random = () => Math.floor(170 + Math.random() * (200 - 170));
  const result: SensitivityResult = {
    geral: random(),
    pontoVermelho: random(),
    mira2x: random(),
    mira4x: random(),
    miraAwm: random(),
    olhadinha: random(),
  };
  if (brand !== "apple") {
    result.Dpi = Math.floor(590 + Math.random() * (800 - 590));
  }
  return result;
};

export const SensitivityGenerator = () => {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SensitivityResult | null>(null);

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel("");
    setResult(null);
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setResult(null);
  };

  const handleGenerate = () => {
    if (!brand || !model) {
      toast.error("Selecione a marca e o modelo!");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const sensitivity = generateSensitivity(brand);
      setResult(sensitivity);
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

      <p className="text-muted-foreground text-sm mb-2">Marca do Dispositivo</p>
      <Select value={brand} onValueChange={handleBrandChange}>
        <SelectTrigger className="w-full mb-3 bg-muted border-border">
          <SelectValue placeholder="Selecione a marca" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="samsung">Samsung</SelectItem>
          <SelectItem value="xiaomi">Xiaomi</SelectItem>
          <SelectItem value="motorola">Motorola</SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      {brand && (
        <>
          <p className="text-muted-foreground text-sm mb-2">Modelo</p>
          <Select value={model} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full mb-4 bg-muted border-border">
              <SelectValue placeholder="Selecione o modelo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {brandModels[brand]?.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !brand || !model}
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isGenerating ? "Gerando..." : "Gerar Sensibilidade"}
      </Button>

      {result && (
        <div className="mt-4 space-y-2">
          <div className="card-gaming-inner rounded-lg p-3 space-y-2">
            {[
              ["Geral", result.geral],
              ["Ponto Vermelho", result.pontoVermelho],
              ["Mira 2x", result.mira2x],
              ["Mira 4x", result.mira4x],
              ["Mira AWM", result.miraAwm],
              ["Olhadinha", result.olhadinha],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}:</span>
                <span className="text-primary font-semibold">{value}</span>
              </div>
            ))}
            {result.Dpi !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">DPI:</span>
                <span className="text-primary font-semibold">{result.Dpi}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
