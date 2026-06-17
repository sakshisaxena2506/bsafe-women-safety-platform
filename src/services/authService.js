import { supabase } from "./supabaseClient";

export async function signInWithEmail(email, password) {
  if (!supabase) {
    return { user: { email, name: "Demo User" }, session: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
}

export async function signUpWithEmail({ email, password, name, mobile }) {
  if (!supabase) {
    return { user: { email, user_metadata: { name, mobile } }, session: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, mobile }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function requestPasswordReset(email) {
  if (!supabase) {
    return { email };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error;
  }

  return data;
}
