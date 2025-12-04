import { useState } from "react";
import { LogOut, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ActionButtonsProps {
  onLogout: () => void;
}

export const ActionButtons = ({ onLogout }: ActionButtonsProps) => {
  const [showGameDialog, setShowGameDialog] = useState(false);

  const handleInject = () => {
    setShowGameDialog(true);
  };

  const openGame = (gameType: "normal" | "max") => {
    const deepLinks = {
      normal: {
        scheme: "freefireth://",
        fallback: "intent://launch#Intent;package=com.dts.freefireth;end",
      },
      max: {
        scheme: "freefiremax://",
        fallback: "intent://launch#Intent;package=com.dts.freefiremax;end",
      },
    };

    const selected = deepLinks[gameType];
    const gameName = gameType === "normal" ? "Free Fire" : "Free Fire Max";

    // Try deep link first
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = selected.scheme;
    document.body.appendChild(iframe);

    // Fallback for Android intent
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.location.href = selected.fallback;
    }, 500);

    toast.success(`Abrindo ${gameName}...`);
    setShowGameDialog(false);
  };

  return (
    <>
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

      {/* Dialog para escolher versão do jogo */}
      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-center text-foreground">
              Escolha a versão
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Selecione qual Free Fire você quer abrir
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              onClick={() => openGame("normal")}
              className="h-20 flex-col gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
            >
              <Gamepad2 className="w-6 h-6" />
              <span className="text-sm font-semibold">Free Fire</span>
            </Button>

            <Button
              onClick={() => openGame("max")}
              className="h-20 flex-col gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[0_0_12px_hsl(var(--secondary)/0.4)]"
            >
              <Gamepad2 className="w-6 h-6" />
              <span className="text-sm font-semibold">Free Fire Max</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
