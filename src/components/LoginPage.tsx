import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import avatarImg from "@/assets/avatar.jpg";

interface LoginPageProps {
  onLogin: (key: string) => Promise<{ success: boolean; error?: string }>;
}

const LOADING_STEPS = [
  { text: "Carregando API...", duration: 800 },
  { text: "Verificando Key...", duration: 1000 },
  { text: "Acesso Liberado!", duration: 600 },
];

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  const runLoadingAnimation = async (callback: () => void) => {
    setShowLoadingOverlay(true);
    setLoadingStep(0);
    setLoadingProgress(0);

    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingStep(i);
      const targetProgress = ((i + 1) / LOADING_STEPS.length) * 100;
      // Animate progress smoothly
      const startProgress = (i / LOADING_STEPS.length) * 100;
      const duration = LOADING_STEPS[i].duration;
      const steps = 20;
      const stepDuration = duration / steps;
      for (let s = 0; s <= steps; s++) {
        await new Promise((r) => setTimeout(r, stepDuration));
        setLoadingProgress(startProgress + ((targetProgress - startProgress) * s) / steps);
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setShowLoadingOverlay(false);
    callback();
  };

  const handleLogin = async () => {
    const trimmedKey = key.trim();

    if (!trimmedKey) {
      toast.error("Por favor, insira uma chave de acesso");
      return;
    }

    if (trimmedKey.length > 100) {
      toast.error("Chave inválida");
      return;
    }

    setIsLoading(true);

    try {
      const result = await onLogin(trimmedKey);

      if (result.success) {
        await runLoadingAnimation(() => {
          toast.success("Acesso autorizado!");
        });
      } else {
        toast.error(result.error || "Chave inválida");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-sm opacity-0 animate-fade-in relative z-10"
        style={{ animationFillMode: "forwards" }}
      >
        <div
          className="rounded-2xl p-6 pt-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(228 12% 12%) 0%, hsl(228 12% 8%) 100%)",
            border: "1px solid hsl(var(--primary) / 0.3)",
            boxShadow: "0 0 30px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(228 12% 20% / 0.3)",
          }}
        >
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div
              className="w-24 h-24 rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
                border: "2px solid hsl(var(--primary) / 0.3)",
              }}
            >
              <img
                src={avatarImg}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-foreground font-bold text-xl tracking-wider mb-1">
            WINK EXTERNAL
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Insira sua chave de acesso
          </p>

          {/* Input */}
          <div className="relative mb-4">
            <input
              type={showKey ? "text" : "password"}
              placeholder="••••••••••"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              maxLength={100}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 rounded-xl font-bold text-base tracking-wider text-primary-foreground bg-primary/80 hover:bg-primary transition-all disabled:opacity-50"
            style={{
              border: "1px solid hsl(var(--primary) / 0.5)",
              boxShadow: "0 0 20px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.2)",
            }}
          >
            {isLoading ? "VERIFICANDO..." : "ACESSAR"}
          </button>

          {/* Footer */}
          <p className="text-center text-muted-foreground/50 text-xs mt-4 tracking-widest uppercase">
            Acesso Restrito
          </p>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Versão 0.1
        </p>
      </div>

      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(10px)", background: "hsl(228 12% 8% / 0.85)" }}
        >
          <div className="w-72 text-center animate-fade-in" style={{ animationFillMode: "forwards" }}>
            <Progress value={loadingProgress} className="h-2 mb-4 bg-muted" />
            <p className="text-primary font-semibold text-sm animate-pulse">
              {LOADING_STEPS[loadingStep]?.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
