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
      <Button
        onClick={handleInject}
        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
      >
        Injetar
      </Button>

      <Button
        onClick={onLogout}
        variant="secondary"
        className="w-full h-12 text-base font-medium bg-muted hover:bg-muted/80 text-foreground"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  );
};
