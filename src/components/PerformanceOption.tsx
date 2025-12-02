import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PerformanceOptionProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  delay?: number;
}

export const PerformanceOption = ({
  icon,
  label,
  checked,
  onCheckedChange,
  delay = 0,
}: PerformanceOptionProps) => {
  return (
    <div
      className={cn(
        "card-gaming-inner flex items-center justify-between px-4 py-3 rounded-lg opacity-0 animate-fade-in",
        "hover:bg-muted/30 transition-all duration-300"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-foreground/90 text-sm font-medium">{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};
