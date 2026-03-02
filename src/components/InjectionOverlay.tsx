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
      // FUNÇÃO DE DISPARO REFORÇADA
      const launchGame = () => {
        const packageName = gameType === "normal" ? "com.dts.freefireth" : "com.dts.freefiremax";
        
        // Tentamos o esquema direto primeiro (mais agressivo)
        const intentUrl = `intent://#Intent;scheme=android-app;package=${packageName};end`;
        
        // Criamos um link invisível e simulamos o clique para tentar burlar o bloqueio do Chrome
        const link = document.createElement("a");
        link.href = intentUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Se o link falhar, tentamos o location direto como backup
        setTimeout(() => {
          window.location.replace(intentUrl);
        }, 100);

        // Finaliza o overlay
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
        {/* Loader */}
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-[4px] border-zinc-800" />
          <div
            className={`absolute inset-0 rounded-full border-[4px] border-transparent border-t-primary transition-all duration-700 ${
              !isFinished ? "animate-spin" : "border-green-500 rotate-[360deg]"
            }`}
          />
          <div className={`absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${
            isFinished ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-primary"
          }`} />
        </div>

        {/* Texto */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tighter uppercase transition-all duration-500"
              style={{ color: isFinished ? "#22c55e" : "white" }}>
            {displayLabel}
          </h2>
          {isFinished && <p className="text-zinc-400 text-sm font-medium animate-pulse">ABRINDO FREE FIRE...</p>}
        </div>

        {/* Barras de Progresso */}
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className="w-10 h-1 rounded-full transition-all duration-500"
              style={{ backgroundColor: i <= currentStep ? (isFinished ? "#22c55e" : "#6366f1") : "#27272a" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
