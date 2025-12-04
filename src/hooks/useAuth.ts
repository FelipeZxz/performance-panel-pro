import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "naxx_session_token";
const SESSION_EXPIRY_KEY = "naxx_session_expiry";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  // Validate session on mount and periodically
  const validateSession = useCallback(async () => {
    const sessionToken = sessionStorage.getItem(SESSION_KEY);
    const sessionExpiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);

    if (!sessionToken || !sessionExpiry) {
      setAuthState({ isAuthenticated: false, isLoading: false });
      return false;
    }

    // Quick client-side expiry check
    if (new Date(sessionExpiry) < new Date()) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_EXPIRY_KEY);
      setAuthState({ isAuthenticated: false, isLoading: false });
      return false;
    }

    try {
      // Server-side validation
      const { data, error } = await supabase.functions.invoke("validate-session", {
        body: { sessionToken },
      });

      if (error || !data?.valid) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_EXPIRY_KEY);
        setAuthState({ isAuthenticated: false, isLoading: false });
        return false;
      }

      setAuthState({ isAuthenticated: true, isLoading: false });
      return true;
    } catch {
      setAuthState({ isAuthenticated: false, isLoading: false });
      return false;
    }
  }, []);

  // Clear session on page load to force re-login
  useEffect(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    setAuthState({ isAuthenticated: false, isLoading: false });
  }, []);

  const login = async (key: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke("validate-key", {
        body: { key },
      });

      if (error) {
        return { success: false, error: "Connection error" };
      }

      if (data?.rateLimited) {
        return { success: false, error: data.error };
      }

      if (data?.valid && data?.sessionToken) {
        sessionStorage.setItem(SESSION_KEY, data.sessionToken);
        sessionStorage.setItem(SESSION_EXPIRY_KEY, data.expiresAt);
        setAuthState({ isAuthenticated: true, isLoading: false });
        return { success: true };
      }

      return { success: false, error: "Invalid key" };
    } catch {
      return { success: false, error: "Connection error" };
    }
  };

  const logout = async () => {
    const sessionToken = sessionStorage.getItem(SESSION_KEY);

    if (sessionToken) {
      try {
        await supabase.functions.invoke("logout", {
          body: { sessionToken },
        });
      } catch {
        // Ignore logout errors, still clear local state
      }
    }

    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    setAuthState({ isAuthenticated: false, isLoading: false });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    validateSession,
  };
};
