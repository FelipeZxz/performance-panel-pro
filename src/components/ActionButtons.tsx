import { useState } from "react";
import ReactDOM from "react-dom";
import { LogOut, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InjectionOverlay } from "./InjectionOverlay";

interface ActionButtonsProps {
  onLogout: () => void;
  onInjectStart?: () => void;
  onInjectEnd?: () => void;
}

export const ActionButtons = ({ onLogout, onInjectStart, onInjectEnd }: ActionButtonsProps) => {
  const [showGameDialog, setShowGameDialog] = useState(false);
  const [injecting, setInjecting] = useState<"normal" | "max" | null>(null);

  const openGame = (gameType: "normal" | "max") => {
    setShowGameDialog(false);
    setInjecting(gameType);
    onInjectStart?.();
  };

  const handleInjectionComplete = () => {
    setInjecting(null);
    onInjectEnd?.();
  };

  return (
    <>
      {injecting && ReactDOM.createPortal(
        <InjectionOverlay
          gameType={injecting}
          onComplete={handleInjectionComplete}
        />,
        document.body
      )}

      <div
        className="space-y-3 opacity-0 animate-slide-up"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <Button
          onClick={() => setShowGameDialog(true)}
          className="
            w-full h-12 text-base font-semibold 
            bg-primary 
            hover:bg-primary/90 
            text-primary-foreground
            shadow-[0_0_14px_hsl(235_86%_65%/0.55)]
            transition-all
          "
        >
          Injetar
        </Button>

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

      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-center text-foreground">
              Escolha a versão
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Selecione em qual Free Fire você quer injetar
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
