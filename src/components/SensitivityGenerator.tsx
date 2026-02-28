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
  apple: [
    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini",
    "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
    "iPhone SE (3ª geração)", "iPhone SE (2ª geração)",
    "iPhone XS Max", "iPhone XS", "iPhone XR",
    "iPhone X", "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7",
  ],
  samsung: [
    "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S24 FE",
    "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S23 FE",
    "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21", "Galaxy S21 FE",
    "Galaxy S20 Ultra", "Galaxy S20+", "Galaxy S20", "Galaxy S20 FE",
    "Galaxy Z Fold 5", "Galaxy Z Fold 4", "Galaxy Z Flip 5", "Galaxy Z Flip 4",
    "Galaxy A55", "Galaxy A54", "Galaxy A53", "Galaxy A52",
    "Galaxy A35", "Galaxy A34", "Galaxy A33", "Galaxy A25", "Galaxy A24", "Galaxy A15", "Galaxy A14", "Galaxy A05",
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy M14",
    "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10+",
  ],
  xiaomi: [
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi Note 13C",
    "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12", "Redmi Note 12S",
    "Redmi Note 11 Pro+", "Redmi Note 11 Pro", "Redmi Note 11", "Redmi Note 11S",
    "Redmi Note 10 Pro", "Redmi Note 10", "Redmi Note 10S",
    "Redmi Note 9 Pro", "Redmi Note 9", "Redmi Note 8 Pro", "Redmi Note 8",
    "Redmi 13C", "Redmi 13", "Redmi 12", "Redmi A2", "Redmi A1",
    "Poco X6 Pro", "Poco X6", "Poco X5 Pro", "Poco X5",
    "Poco F5 Pro", "Poco F5", "Poco F4", "Poco F3",
    "Poco M6 Pro", "Poco M5", "Poco M4 Pro",
    "Mi 14 Ultra", "Mi 14 Pro", "Mi 14", "Mi 13T Pro", "Mi 13T", "Mi 13 Pro", "Mi 13",
    "Mi 12 Pro", "Mi 12", "Mi 11 Ultra", "Mi 11",
  ],
  motorola: [
    "Edge 50 Ultra", "Edge 50 Pro", "Edge 50", "Edge 50 Fusion",
    "Edge 40 Pro", "Edge 40 Neo", "Edge 40",
    "Edge 30 Ultra", "Edge 30 Pro", "Edge 30 Neo", "Edge 30",
    "Moto G84", "Moto G73", "Moto G72", "Moto G54", "Moto G53",
    "Moto G34", "Moto G24", "Moto G23", "Moto G22",
    "Moto G14", "Moto G13", "Moto G04", "Moto G04s",
    "Moto E22", "Moto E22i", "Moto E13",
    "Moto G200", "Moto G100", "Moto G Stylus", "Moto G Power",
    "Razr 40 Ultra", "Razr 40",
  ],
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
  const [visibleItems, setVisibleItems] = useState(0);

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel("");
    setResult(null);
    setVisibleItems(0);
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setResult(null);
    setVisibleItems(0);
  };

  const handleGenerate = () => {
    if (!brand || !model) {
      toast.error("Selecione a marca e o modelo!");
      return;
    }
    setIsGenerating(true);
    setVisibleItems(0);
    setTimeout(() => {
      const sensitivity = generateSensitivity(brand);
      setResult(sensitivity);
      setIsGenerating(false);
      toast.success("Sensibilidade gerada com sucesso!");

      // Animate items appearing one by one
      const totalItems = brand === "apple" ? 6 : 7;
      for (let i = 0; i < totalItems; i++) {
        setTimeout(() => setVisibleItems((v) => v + 1), (i + 1) * 200);
      }
    }, 1500);
  };

  const sensitivityEntries: [string, number][] = result
    ? [
        ["Geral", result.geral],
        ["Ponto Vermelho", result.pontoVermelho],
        ["Mira 2x", result.mira2x],
        ["Mira 4x", result.mira4x],
        ["Mira AWM", result.miraAwm],
        ["Olhadinha", result.olhadinha],
        ...(result.Dpi !== undefined ? [["DPI", result.Dpi] as [string, number]] : []),
      ]
    : [];

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
            <SelectContent className="bg-card border-border max-h-60">
              {(brandModels[brand] || []).map((m) => (
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
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Gerando...
          </span>
        ) : (
          "Gerar Sensibilidade"
        )}
      </Button>

      {result && (
        <div className="mt-4 space-y-2">
          <div className="card-gaming-inner rounded-lg p-3 space-y-2">
            {sensitivityEntries.map(([label, value], index) => (
              <div
                key={label}
                className="flex justify-between text-sm transition-all duration-300"
                style={{
                  opacity: visibleItems > index ? 1 : 0,
                  transform: visibleItems > index ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                }}
              >
                <span className="text-muted-foreground">{label}:</span>
                <span className="text-primary font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
