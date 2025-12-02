import { CheckCircle2 } from "lucide-react";

export const StatusBanner = () => {
  return (
    <div
      className="status-banner rounded-xl py-3 px-4 flex items-center justify-center gap-2 opacity-0 animate-slide-up animate-pulse-glow"
      style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
    >
      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
      <span className="text-foreground/90 text-sm font-medium">
        Acesso autorizado! Bem-vindo ao NaxxPanel
      </span>
    </div>
  );
};
