import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Key, Settings, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!key.trim()) {
      toast.error("Por favor, insira uma chave de acesso");
      return;
    }

    setIsLoading(true);
    
    // Fetch the current password from the database
    const { data } = await supabase
      .from('settings')
      .select('password')
      .eq('id', 'main')
      .maybeSingle();

    setTimeout(() => {
      if (data && key === data.password) {
        toast.success("Acesso autorizado!");
        onLogin();
      } else {
        toast.error("Chave inválida");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (!adminKey.trim() || !newPassword.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    // Verify admin key
    const { data: settings } = await supabase
      .from('settings')
      .select('admin_key')
      .eq('id', 'main')
      .maybeSingle();

    if (!settings || adminKey !== settings.admin_key) {
      toast.error("Chave de admin inválida");
      return;
    }

    // Update password
    const { error } = await supabase
      .from('settings')
      .update({ password: newPassword })
      .eq('id', 'main');

    if (error) {
      toast.error("Erro ao alterar senha");
      return;
    }

    toast.success("Senha alterada com sucesso!");
    setShowAdminPanel(false);
    setAdminKey("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        className="w-full max-w-sm opacity-0 animate-fade-in"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="text-center mb-8">
          <h1 className="title-gradient font-display text-3xl font-bold tracking-wider mb-2">
            NaxxPanel
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
                <div>
                  <label className="text-muted-foreground text-sm mb-2 block">
                    Chave de Admin
                  </label>
                  <Input
                    type="password"
                    placeholder="Digite a chave de admin"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground text-sm mb-2 block">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite a nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleChangePassword}
                  variant="secondary"
                  className="w-full"
                >
                  Alterar Senha
                </Button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Versão 2.0 • Desenvolvido por FlpX
        </p>
      </div>
    </div>
  );
};
