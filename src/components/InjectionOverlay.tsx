import { useState, useEffect } from "react";
import { AppLauncher } from "@capacitor/app-launcher";

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
  }, [currentStep]);

  const isFinished = currentStep >= steps.length;
  const displayLabel = isFinished ? "Sucesso!" : steps[currentStep]?.label;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Loader Circular Atualizado */}
        <div className="relative w-28 h-28">
          {/* Borda de fundo (cinza) */}
          <div className="absolute inset-0 rounded-full border-[4px] border-zinc-800" />
          
          {/* Borda que gira e fica verde */}
          <div
            className={`absolute inset-0 rounded-full border-[4px] border-transparent transition-all duration-700 ${
              !isFinished ? "animate-spin border-t-primary" : "border-green-500 rotate-[360deg]"
            }`}
            style={{
              boxShadow: isFinished ? "0 0 25px rgba(34, 197, 94, 0.5)" : "none",
            }}
          />
          
          {/* Ponto central */}
          <div className={`absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${
            isFinished ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-primary"
          }`} />
        </div>

        {/* Textos */}
        <div className="space-y-2">
          <h2
            className="text-3xl font-black tracking-tighter uppercase transition-all duration-500"
            style={{ color: isFinished ? "#22c55e" : "white" }}
          >
            {displayLabel}
          </h2>
          
          {isFinished && (
            <p className="text-zinc-500 text-base font-semibold tracking-widest uppercase animate-pulse">
              ABRA O JOGO
            </p>
          )}
        </div>

        {/* Barrinhas de Progresso */}
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-10 h-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i <= currentStep ? (isFinished ? "#22c55e" : "#6366f1") : "#27272a",
                transform: i === currentStep && !isFinished ? "scaleY(1.5)" : "scaleY(1)"
              }}
            />
          ))}
        </div>

        {isFinished && (
          <button
            onClick={() => {
              const pkg = gameType === "max" ? "com.dts.freefiremax" : "com.dts.freefireth";
              // Tenta abrir o app diretamente sem fallback pra Play Store
              window.location.href = `android-app://${pkg}`;
            }}
            className="mt-2 px-8 py-3 rounded-lg bg-green-500 text-zinc-950 font-bold text-base uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:bg-green-400 transition-all duration-300"
          >
            Abrir Jogo
          </button>
        )}
      </div>
    </div>
  );
};
