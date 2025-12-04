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
    const trimmedKey = key.trim();
    
    if (!trimmedKey) {
      toast.error("Por favor, insira uma chave de acesso");
      return;
    }

    // Basic input validation
    if (trimmedKey.length > 100) {
      toast.error("Chave inválida");
      return;
    }

    setIsLoading(true);

    try {
      // Validate key server-side via Edge Function (password never exposed to client)
      const { data, error } = await supabase.functions.invoke("validate-key", {
        body: { key: trimmedKey },
      });

      if (error) {
        console.error("Validation error");
        toast.error("Erro ao validar chave");
        setIsLoading(false);
        return;
      }

      if (data?.valid) {
        toast.success("Acesso autorizado!");
        onLogin();
      } else {
        toast.error("Chave inválida");
      }
    } catch (err) {
      console.error("Login error");
      toast.error("Erro de conexão");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
            bottom: "-5%",
            left: "-10%",
            animationDelay: "1s",
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 blur-2xl animate-float"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            top: "40%",
            left: "10%",
            animationDelay: "0.5s",
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        
        {/* Animated lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-slow" />
        <div 
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div
        className="w-full max-w-sm opacity-0 animate-fade-in relative z-10"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="text-center mb-8">
          <h1 className="title-gradient font-display text-3xl font-bold tracking-wider mb-2">
            Acesso ao Painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Melhor Assistente de Mira do Free Fire.
          </p>
        </div>

        <div className="card-gaming rounded-xl p-6 backdrop-blur-sm">
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
                maxLength={100}
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_14px_hsl(var(--primary)/0.4)]"
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </Button>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Versão 2.0 • Desenvolvido por Felipe
        </p>
      </div>
    </div>
  );
};
