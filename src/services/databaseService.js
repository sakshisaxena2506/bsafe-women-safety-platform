import { alerts as fallbackAlerts } from "../data/alerts";
import { contacts as fallbackContacts } from "../data/contacts";
import { safeZones as fallbackSafeZones } from "../data/safeZones";
import { volunteers as fallbackVolunteers } from "../data/volunteers";
import { users as fallbackUsers } from "../data/users";
import { supabase } from "./supabaseClient";

function ensureSupabase() {
  return Boolean(supabase);
}

function normalizeSupabaseError(error) {
  if (!error) {
    return null;
  }

  return new Error(error.message || "Supabase request failed.");
}

export async function getProfile(userId) {
  if (!ensureSupabase() || !userId) {
    return null;
  }

  const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .maybeSingle();
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function upsertProfile(profile) {
  if (!ensureSupabase()) {
    return profile;
  }

  const { data, error } = await supabase.from("profiles").upsert(profile).select().single();
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function listContacts(userId) {
  if (!ensureSupabase()) {
    return fallbackContacts;
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function saveContact(contact) {
  if (!ensureSupabase()) {
    return contact;
  }

  const { data, error } = await supabase.from("contacts").upsert(contact).select().single();
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function removeContact(contactId) {
  if (!ensureSupabase()) {
    return contactId;
  }

  const { error } = await supabase.from("contacts").delete().eq("id", contactId);
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return contactId;
}

export async function createAlert(alert) {
  if (!ensureSupabase()) {
    return alert;
  }

  const { data, error } = await supabase.from("alerts").insert(alert).select().single();
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function listAlerts(userId, role = "user") {
  if (!ensureSupabase()) {
    return fallbackAlerts;
  }

  let query = supabase.from("alerts").select("*").order("created_at", { ascending: false });

  if (role === "user") {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function updateAlertStatus(alertId, status, volunteerId) {
  if (!ensureSupabase()) {
    return { id: alertId, status, volunteer_id: volunteerId };
  }

  const { data, error } = await supabase
    .from("alerts")
    .update({ status, volunteer_id: volunteerId })
    .eq("id", alertId)
    .select()
    .single();

  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function listSafeZones() {
  if (!ensureSupabase()) {
    return fallbackSafeZones;
  }

  const { data, error } = await supabase.from("safe_zones").select("*").order("name");
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function listVolunteers() {
  if (!ensureSupabase()) {
    return fallbackVolunteers;
  }

  const { data, error } = await supabase.from("volunteers").select("*").order("created_at", { ascending: false });
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}

export async function listUsers() {
  if (!ensureSupabase()) {
    return fallbackUsers;
  }

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  const normalizedError = normalizeSupabaseError(error);

  if (normalizedError) {
    throw normalizedError;
  }

  return data;
}
