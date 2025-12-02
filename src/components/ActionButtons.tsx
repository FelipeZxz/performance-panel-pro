import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ActionButtonsProps {
  onLogout: () => void;
}

export const ActionButtons = ({ onLogout }: ActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSelect = (type: "normal" | "max") => {
    setOpen(false);

    // Exibir mensagem de sucesso
    setSuccess(true);

    // Fecha automaticamente a mensagem depois de 3 segundos
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="space-y-3 opacity-0 animate-slide-up"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        {/* Botão Injetar */}
        <Button
          onClick={() => setOpen(true)}
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

        {/* Botão Sair */}
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

      {/* Modal de escolha */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0d0d0d] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Escolha a versão do Free Fire
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-3">
            <Button
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl"
              onClick={() => handleSelect("normal")}
            >
              Free Fire Normal
            </Button>

            <Button
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl"
              onClick={() => handleSelect("max")}
            >
              Free Fire Max
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mensagem de sucesso */}
      {success && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-center animate-pulse">
          Injetado com sucesso!
        </div>
      )}
    </>
  );
};
