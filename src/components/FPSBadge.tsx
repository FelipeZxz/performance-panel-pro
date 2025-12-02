import { cn } from "@/lib/utils";

interface FPSBadgeProps {
  selectedFPS: 60 | 120;
  onFPSChange: (fps: 60 | 120) => void;
}

export const FPSBadge = ({ selectedFPS, onFPSChange }: FPSBadgeProps) => {
  return (
    <div
      className="w-full rounded-xl py-4 px-4 opacity-0 animate-fade-in"
      style={{
        background: "linear-gradient(135deg, hsl(25, 60%, 35%) 0%, hsl(25, 70%, 40%) 100%)",
        animationFillMode: "forwards",
      }}
    >
      <p className="text-center text-foreground/80 text-sm mb-3">Selecione o limite de FPS</p>
      <div className="flex gap-3">
        <button
          onClick={() => onFPSChange(60)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300",
            selectedFPS === 60
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-background/30 text-foreground/80 hover:bg-background/50"
          )}
        >
          60 FPS
        </button>
        <button
          onClick={() => onFPSChange(120)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300",
            selectedFPS === 120
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-background/30 text-foreground/80 hover:bg-background/50"
          )}
        >
          120 FPS
        </button>
      </div>
    </div>
  );
};
