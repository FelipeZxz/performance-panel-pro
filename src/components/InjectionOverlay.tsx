import { useState, useEffect } from "react";

interface InjectionOverlayProps {
  gameType: "normal" | "max";
  onComplete: () => void;
}

const steps = [
  { label: "Processando...", duration: 1500 },
  { label: "Injetando Bypass...", duration: 1800 },
  { label: "Otimizando...", duration: 1200 },
  { label: "Sucesso!", duration: 1000 },
];

export const InjectionOverlay = ({ gameType, onComplete }: InjectionOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    }

    if (currentStep === steps.length) {
      const launchGame = () => {
        const packageName = gameType === "normal" ? "com.dts.freefireth" : "com.dts.freefiremax";
        
        // NOVO FORMATO: Tenta abrir diretamente pelo esquema de pacote do Android
        // Adicionamos 'S.browser_fallback_url=' vazio para evitar que ele vá para a Play Store se falhar
        const intentUrl = `intent:#Intent;package=${packageName};end`;
        
        // Método 1: Localização direta
        window.location.href = intentUrl;

        // Método 2 (Backup): Clique simulado
        const link = document.createElement("a");
        link.href = intentUrl;
        link.click();

        setTimeout(onComplete, 1500);
      };

      launchGame();
    }
  }, [currentStep, gameType, onComplete]);

  const isFinished = currentStep >= steps.length;
  const displayLabel = isFinished ? "Sucesso!" : steps[currentStep]?.label;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-[4px] border-zinc-800" />
          <div className={`absolute inset-0 rounded-full border-[4px] border-transparent border-t-primary transition-all duration-700 ${!isFinished ? "animate-spin" : "border-green-500 rotate-[360deg]"}`} />
          <div className={`absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${isFinished ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-primary"}`} />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tighter uppercase transition-all duration-500" style={{ color: isFinished ? "#22c55e" : "white" }}>
            {displayLabel}
          </h2>
          {isFinished && <p className="text-zinc-400 text-sm font-medium animate-pulse">INICIANDO JOGO...</p>}
        </div>

        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className="w-10 h-1 rounded-full transition-all duration-500" style={{ backgroundColor: i <= currentStep ? (isFinished ? "#22c55e" : "#6366f1") : "#27272a" }} />
          ))}
        </div>
      </div>
    </div>
  );
};
