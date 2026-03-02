import { useState, useEffect } from "react";

interface InjectionOverlayProps {
  gameType: "normal" | "max";
  onComplete: () => void;
}

const steps = [
  { label: "Processando...", duration: 1500 },
  { label: "Injetando Bypass...", duration: 2000 },
  { label: "Otimizando...", duration: 1500 },
  { label: "Sucesso!", duration: 1200 },
];

export const InjectionOverlay = ({ gameType, onComplete }: InjectionOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      const next = currentStep + 1;
      setCurrentStep(next);

      if (next >= steps.length) {
        // Abrir o jogo direto via intent Android
        setTimeout(() => {
          const packageName =
            gameType === "normal"
              ? "com.dts.freefireth"
              : "com.dts.freefiremax";

          const intentUrl = `intent://#Intent;package=${packageName};end`;

          window.location.href = intentUrl;

          onComplete();
        }, 600);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, gameType, onComplete]);

  const displayLabel =
    currentStep < steps.length
      ? steps[currentStep].label
      : "Sucesso!";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinning circle */}
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-muted" />

          {/* Spinning arc */}
          <div
            className={`absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary ${
              currentStep < steps.length ? "animate-spin" : ""
            }`}
            style={{
              animationDuration: "1s",
              boxShadow:
                currentStep >= steps.length
                  ? "0 0 20px hsl(142 76% 36% / 0.5)"
                  : "0 0 15px hsl(235 86% 65% / 0.4)",
              borderTopColor:
                currentStep >= steps.length
                  ? "hsl(142, 76%, 36%)"
                  : undefined,
            }}
          />

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500"
            style={{
              backgroundColor:
                currentStep >= steps.length
                  ? "hsl(142, 76%, 36%)"
                  : "hsl(235, 86%, 65%)",
              boxShadow:
                currentStep >= steps.length
                  ? "0 0 10px hsl(142 76% 36% / 0.6)"
                  : "0 0 10px hsl(235 86% 65% / 0.6)",
            }}
          />
        </div>

        {/* Status text */}
        <p
          className="text-lg font-semibold tracking-wide transition-all duration-300"
          style={{
            color:
              currentStep >= steps.length
                ? "hsl(142, 76%, 36%)"
                : "hsl(var(--foreground))",
          }}
        >
          {displayLabel}
        </p>

        {/* Step indicators */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  i <= currentStep
                    ? "hsl(235, 86%, 65%)"
                    : "hsl(228, 12%, 22%)",
                boxShadow:
                  i <= currentStep
                    ? "0 0 6px hsl(235 86% 65% / 0.5)"
                    : "none",
                transform:
                  i === currentStep ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};