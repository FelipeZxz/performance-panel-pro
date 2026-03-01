import { cn } from "@/lib/utils";

interface FPSBadgeProps {
  selectedFPS: 60 | 120;
  onFPSChange: (fps: 60 | 120) => void;
}

export const FPSBadge = ({ selectedFPS, onFPSChange }: FPSBadgeProps) => {
  return (
    <div
      className="w-full rounded-xl py-4 px-4 opacity-0 animate-fade-in border border-border"
      style={{
        background: "var(--gradient-card)",
        animationFillMode: "forwards",
      }}
    >
      <p className="text-center text-foreground/80 text-sm mb-3">
        Selecione o limite de FPS
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onFPSChange(60)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 border border-border",
            selectedFPS === 60
              ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(235_86%_65%/0.6)]"
              : "bg-muted text-foreground/70 hover:bg-muted/80"
          )}
        >
          60 FPS
        </button>

        <button
          onClick={() => onFPSChange(120)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 border border-border",
            selectedFPS === 120
              ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(235_86%_65%/0.6)]"
              : "bg-muted text-foreground/70 hover:bg-muted/80"
          )}
        >
          120 FPS
        </button>
      </div>
    </div>
  );
};
