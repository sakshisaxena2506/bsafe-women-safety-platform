import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";
import { SafetyProvider } from "./SafetyContext";
import { ThemeProvider } from "./ThemeContext";
import { Toaster } from "react-hot-toast";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <SafetyProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3200,
                style: {
                  borderRadius: "16px",
                  background: "#102027",
                  color: "#fff",
                  boxShadow: "0 18px 45px rgba(16, 32, 39, 0.18)"
                }
              }}
            />
          </SafetyProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
