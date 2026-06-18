import { demoAccounts } from "../data/users";
import { upsertProfile } from "./databaseService";
import { supabase } from "./supabaseClient";

function getDemoUserByEmail(email) {
  const account = Object.values(demoAccounts).find((demoUser) => demoUser.email === email);
  return account || { ...demoAccounts.user, email };
}

export async function getCurrentSession() {
  if (!supabase) {
    return {
      session: null,
      user: demoAccounts.user
    };
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return {
    session: data.session,
    user: data.session?.user || null
  };
}

export function onAuthStateChange(callback) {
  if (!supabase) {
    return { unsubscribe: () => {} };
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return data.subscription;
}

export async function signInWithEmail(email, password) {
  if (!supabase) {
    return {
      user: getDemoUserByEmail(email),
      session: null
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
}

export async function signUpWithEmail({ email, password, name, mobile, role = "user" }) {
  if (!supabase) {
    return {
      user: {
        ...demoAccounts.user,
        name,
        email,
        phone: mobile,
        role
      },
      session: null
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, mobile, role }
    }
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    await upsertProfile({
      id: data.user.id,
      name,
      email,
      phone: mobile,
      role,
      safety_status: "Protected"
    });
  }

  return data;
}

export async function requestPasswordReset(email) {
  if (!supabase) {
    return { email };
  }

  const redirectTo = `${window.location.origin}/login`;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  if (!supabase) {
    return true;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}
