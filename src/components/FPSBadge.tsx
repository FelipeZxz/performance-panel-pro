import { cn } from "@/lib/utils";

interface FPSBadgeProps {
  selectedFPS: 60 | 120;
  onFPSChange: (fps: 60 | 120) => void;
}

export const FPSBadge = ({ selectedFPS, onFPSChange }: FPSBadgeProps) => {
  return (
    <div
      className="w-full rounded-xl py-4 px-4 opacity-0 animate-fade-in border border-white/20"
      style={{
        background: "linear-gradient(180deg, hsl(0, 0%, 10%) 0%, hsl(0, 0%, 6%) 100%)",
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
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 border border-white/10",
            selectedFPS === 60
              ? "bg-red-600 text-white shadow-[0_0_12px_rgba(255,0,0,0.6)]"
              : "bg-zinc-900 text-foreground/70 hover:bg-zinc-800"
          )}
        >
          60 FPS
        </button>

        <button
          onClick={() => onFPSChange(120)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 border border-white/10",
            selectedFPS === 120
              ? "bg-red-600 text-white shadow-[0_0_12px_rgba(255,0,0,0.6)]"
              : "bg-zinc-900 text-foreground/70 hover:bg-zinc-800"
          )}
        >
          120 FPS
        </button>
      </div>
    </div>
  );
};
