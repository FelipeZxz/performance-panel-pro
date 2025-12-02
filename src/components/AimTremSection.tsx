import { Switch } from "@/components/ui/switch";
import { Target } from "lucide-react";

interface AimTremSectionProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const AimTremSection = ({ checked, onCheckedChange }: AimTremSectionProps) => {
  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-foreground">AimTrem</h3>
      </div>

      <div className="card-gaming-inner flex items-center justify-between px-4 py-3 rounded-lg">
        <span className="text-foreground/90 text-sm">Remova o Shake</span>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
};
