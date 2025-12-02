import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { DashboardPanel } from "./DashboardPanel";

export const NaxxPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <DashboardPanel onLogout={() => setIsLoggedIn(false)} />;
};
