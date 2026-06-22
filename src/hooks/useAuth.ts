import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "naxx_session_token";
const SESSION_EXPIRY_KEY = "naxx_session_expiry";
const SESSION_ADMIN_KEY = "naxx_session_is_admin";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  sessionToken: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    sessionToken: null,
  });

  // Clear session on page load to force re-login
  useEffect(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    sessionStorage.removeItem(SESSION_ADMIN_KEY);
    setAuthState({ isAuthenticated: false, isAdmin: false, isLoading: false, sessionToken: null });
  }, []);

  const login = async (key: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke("validate-key", {
        body: { key },
      });

      if (error) return { success: false, error: "Erro de conexão" };
      if (data?.rateLimited) return { success: false, error: data.error };

      if (data?.valid && data?.sessionToken) {
        sessionStorage.setItem(SESSION_KEY, data.sessionToken);
        sessionStorage.setItem(SESSION_EXPIRY_KEY, data.expiresAt);
        sessionStorage.setItem(SESSION_ADMIN_KEY, data.isAdmin ? "1" : "0");
        setAuthState({
          isAuthenticated: true,
          isAdmin: !!data.isAdmin,
          isLoading: false,
          sessionToken: data.sessionToken,
        });
        return { success: true };
      }

      return { success: false, error: data?.error || "Chave inválida" };
    } catch {
      return { success: false, error: "Erro de conexão" };
    }
  };

  const logout = async () => {
    const sessionToken = sessionStorage.getItem(SESSION_KEY);
    if (sessionToken) {
      try {
        await supabase.functions.invoke("logout", { body: { sessionToken } });
      } catch {
        // ignore
      }
    }
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    sessionStorage.removeItem(SESSION_ADMIN_KEY);
    setAuthState({ isAuthenticated: false, isAdmin: false, isLoading: false, sessionToken: null });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isAdmin: authState.isAdmin,
    isLoading: authState.isLoading,
    sessionToken: authState.sessionToken,
    login,
    logout,
  };
};
