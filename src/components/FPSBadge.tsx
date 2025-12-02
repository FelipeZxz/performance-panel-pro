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
        background: "linear-gradient(135deg, #1a1a1a 0%, #202020 100%)",
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
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300",
            selectedFPS === 60
              ? "bg-orange-500 text-black shadow-md"
              : "bg-zinc-800 text-foreground/70 hover:bg-zinc-700"
          )}
        >
          60 FPS
        </button>

        <button
          onClick={() => onFPSChange(120)}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300",
            selectedFPS === 120
              ? "bg-orange-500 text-black shadow-md"
              : "bg-zinc-800 text-foreground/70 hover:bg-zinc-700"
          )}
        >
          120 FPS
        </button>
      </div>
    </div>
  );
};
