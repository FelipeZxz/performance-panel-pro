import { LoginPage } from "./LoginPage";
import { DashboardPanel } from "./DashboardPanel";
import { useAuth } from "@/hooks/useAuth";

export const NaxxPanel = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return <DashboardPanel onLogout={logout} />;
};
