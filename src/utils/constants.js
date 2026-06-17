export const APP_NAME = "bSafe";

export const ROUTES = {
  landing: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  sos: "/sos",
  contacts: "/contacts",
  safeZones: "/safe-zones",
  history: "/incident-history",
  volunteer: "/volunteer",
  admin: "/admin",
  profile: "/profile",
  notifications: "/notifications",
  settings: "/settings"
};

export const severityStyles = {
  critical: "bg-roseguard-100 text-roseguard-700 dark:bg-roseguard-500/15 dark:text-roseguard-100",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-100",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100",
  low: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100"
};

export const statusStyles = {
  active: "bg-roseguard-100 text-roseguard-700 dark:bg-roseguard-500/15 dark:text-roseguard-100",
  assigned: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-100",
  resolved: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100",
  verified: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100",
  review: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100"
};
