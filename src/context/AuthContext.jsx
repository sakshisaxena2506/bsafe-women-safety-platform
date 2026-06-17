import { createContext, useContext, useMemo, useState } from "react";
import { currentUser } from "../data/users";
import { signInWithEmail, signUpWithEmail } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(currentUser);
  const [authError, setAuthError] = useState("");

  async function login(email, password) {
    setAuthError("");
    const result = await signInWithEmail(email, password);
    setUser({
      ...currentUser,
      email: result.user?.email || email
    });
  }

  async function register(values) {
    setAuthError("");
    await signUpWithEmail(values);
    setUser({
      ...currentUser,
      name: values.name,
      email: values.email,
      phone: values.mobile
    });
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authError,
      setAuthError,
      login,
      register,
      logout
    }),
    [authError, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
