import { useState, useCallback } from "react";
import { LoginPage } from "./LoginPage";
import { DashboardPanel } from "./DashboardPanel";
import { AdminPanel } from "./AdminPanel";
import { SplashScreen } from "./SplashScreen";
import { useAuth } from "@/hooks/useAuth";

export const NaxxPanel = () => {
  const { isAuthenticated, isAdmin, isLoading, sessionToken, login, logout } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

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

  if (isAdmin && sessionToken) {
    return <AdminPanel sessionToken={sessionToken} onLogout={logout} />;
  }

  return <DashboardPanel onLogout={logout} />;
};
