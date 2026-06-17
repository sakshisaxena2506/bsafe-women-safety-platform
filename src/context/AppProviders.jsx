import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";
import { SafetyProvider } from "./SafetyContext";
import { ThemeProvider } from "./ThemeContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <SafetyProvider>{children}</SafetyProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
