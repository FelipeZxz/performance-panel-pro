import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim().length > 0) {
      onLogin();
    } else {
      setError("Digite uma key válida");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div
        className="w-full max-w-md card-gaming rounded-2xl p-6 opacity-0 animate-fade-in"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="text-center mb-6">
          <h1 className="title-gradient font-display text-2xl font-bold mb-2">
            Acesso ao Painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Digite a key de acesso para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-foreground text-sm font-medium mb-2 block">
              Key de Acesso
            </label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="Digite a key aqui"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setError("");
                }}
                className="bg-muted border-border/50 h-12 pr-12 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Acessar Painel
          </Button>
        </form>

        <div
          className="mt-6 card-gaming-inner rounded-xl p-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <p className="text-primary text-sm font-semibold mb-3">
            Para usar na tela inicial:
          </p>
          <ol className="text-muted-foreground text-sm space-y-1.5">
            <li>1. Acesse no Navegador</li>
            <li>2. Toque em compartilhar</li>
            <li>3. Adicionar à Tela Inicial</li>
            <li>4. Abra o app pela tela inicial</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
