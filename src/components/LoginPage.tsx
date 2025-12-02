import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!key.trim()) {
      toast.error("Por favor, insira uma chave de acesso");
      return;
    }

    setIsLoading(true);

    // Buscar senha real no Supabase
    const { data } = await supabase
      .from("settings")
      .select("password")
      .eq("id", "main")
      .maybeSingle();

    setTimeout(() => {
      if (data && key === data.password) {
        toast.success("Acesso autorizado!");
        onLogin();
      } else {
        toast.error("Chave inválida");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        className="w-full max-w-sm opacity-0 animate-fade-in"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="text-center mb-8">
          <h1 className="title-gradient font-display text-3xl font-bold tracking-wider mb-2">
            SnTx Painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Otimizador de desempenho do Free Fire
          </p>
        </div>

        <div className="card-gaming rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-primary" />
            <h2 className="text-foreground font-semibold">Acesso ao Painel</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-sm mb-2 block">
                Chave de Acesso
              </label>
              <Input
                type="password"
                placeholder="Digite sua chave"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </Button>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Versão 2.0 • Desenvolvido por FlpX
        </p>
      </div>
    </div>
  );
};
