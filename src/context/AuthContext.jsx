import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { demoAccounts } from "../data/users";
import { getProfile, upsertProfile } from "../services/databaseService";
import {
  getCurrentSession,
  onAuthStateChange,
  signInWithEmail,
  signOut,
  signUpWithEmail
} from "../services/authService";

const AuthContext = createContext(null);

function mapProfile(authUser, profile) {
  if (!authUser) {
    return null;
  }

  const metadata = authUser.user_metadata || {};

  return {
    id: authUser.id || profile?.id || demoAccounts.user.id,
    name: profile?.name || metadata.name || authUser.name || demoAccounts.user.name,
    email: authUser.email || profile?.email || demoAccounts.user.email,
    phone: profile?.phone || metadata.mobile || authUser.phone || demoAccounts.user.phone,
    address: profile?.address || authUser.address || demoAccounts.user.address,
    bloodGroup: profile?.blood_group || authUser.bloodGroup || "O+",
    role: profile?.role || metadata.role || authUser.role || "user",
    safetyStatus: profile?.safety_status || authUser.safetyStatus || "Protected",
    avatarColor: authUser.avatarColor || demoAccounts.user.avatarColor
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function hydrateSession() {
      try {
        const current = await getCurrentSession();
        if (!mounted) {
          return;
        }

        setSession(current.session);

        if (current.user) {
          const profile = current.user.id ? await getProfile(current.user.id).catch(() => null) : null;
          setUser(mapProfile(current.user, profile));
        }
      } catch (error) {
        setAuthError(error.message);
      } finally {
        if (mounted) {
          setIsAuthLoading(false);
        }
      }
    }

    hydrateSession();

    const subscription = onAuthStateChange(async (nextSession) => {
      setSession(nextSession);

      if (!nextSession?.user) {
        setUser(null);
        return;
      }

      const profile = await getProfile(nextSession.user.id).catch(() => null);
      setUser(mapProfile(nextSession.user, profile));
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  async function login(email, password) {
    setAuthError("");

    try {
      const result = await signInWithEmail(email, password);
      const profile = result.user?.id ? await getProfile(result.user.id).catch(() => null) : null;
      setSession(result.session);
      setUser(mapProfile(result.user, profile));
      toast.success("Welcome back to bSafe.");
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    }
  }

  async function register(values) {
    setAuthError("");

    try {
      const result = await signUpWithEmail(values);
      setSession(result.session);
      setUser(mapProfile(result.user, null));
      toast.success("Your bSafe account is ready.");
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    }
  }

  async function logout() {
    await signOut();
    setSession(null);
    setUser(null);
    toast.success("Signed out securely.");
  }

  async function updateProfile(values) {
    if (!user) {
      return;
    }

    try {
      const savedProfile = await upsertProfile({
        id: user.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        blood_group: values.bloodGroup || user.bloodGroup,
        role: user.role,
        safety_status: user.safetyStatus
      });

      setUser((current) => ({
        ...current,
        name: savedProfile.name || values.name,
        email: savedProfile.email || values.email,
        phone: savedProfile.phone || values.phone,
        address: savedProfile.address || values.address,
        bloodGroup: savedProfile.blood_group || values.bloodGroup || current.bloodGroup
      }));
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  const value = useMemo(
    () => ({
      user,
      session,
      role: user?.role || "guest",
      isAuthenticated: Boolean(user),
      isAuthLoading,
      authError,
      setAuthError,
      login,
      register,
      logout,
      updateProfile
    }),
    [authError, isAuthLoading, session, user]
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
