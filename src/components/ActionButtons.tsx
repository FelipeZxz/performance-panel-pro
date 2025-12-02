import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionButtonsProps {
  onLogout: () => void;
}

export const ActionButtons = ({ onLogout }: ActionButtonsProps) => {
  const handleInject = () => {
    toast.success("Injetado com sucesso!");
  };

  return (
    <div
      className="space-y-3 opacity-0 animate-slide-up"
      style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
    >
      {/* Botão Injetar - Neon Vermelho */}
      <Button
        onClick={handleInject}
        className="
          w-full h-12 text-base font-semibold 
          bg-red-600 
          hover:bg-red-700 
          text-white
          shadow-[0_0_14px_rgba(255,0,0,0.55)]
          transition-all
        "
      >
        Injetar
      </Button>

      {/* Botão Sair - Cinza Escuro com Borda Fina */}
      <Button
        onClick={onLogout}
        variant="secondary"
        className="
          w-full h-12 text-base font-medium 
          bg-zinc-900 
          hover:bg-zinc-800 
          text-foreground 
          border border-white/20
        "
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  );
};
