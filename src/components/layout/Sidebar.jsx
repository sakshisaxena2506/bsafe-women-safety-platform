import {
  Bell,
  Contact,
  History,
  Home,
  LifeBuoy,
  MapPin,
  Settings,
  ShieldAlert,
  User,
  Users,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/constants";
import Button from "../common/Button";

const navItems = [
  { label: "Dashboard", path: ROUTES.dashboard, icon: Home, roles: ["user", "volunteer", "admin"] },
  { label: "SOS Center", path: ROUTES.sos, icon: ShieldAlert, roles: ["user", "volunteer", "admin"] },
  { label: "Contacts", path: ROUTES.contacts, icon: Contact, roles: ["user", "volunteer", "admin"] },
  { label: "Safe Zones", path: ROUTES.safeZones, icon: MapPin, roles: ["user", "volunteer", "admin"] },
  { label: "Incidents", path: ROUTES.history, icon: History, roles: ["user", "volunteer", "admin"] },
  { label: "Volunteer", path: ROUTES.volunteer, icon: LifeBuoy, roles: ["volunteer", "admin"] },
  { label: "Admin", path: ROUTES.admin, icon: Users, roles: ["admin"] },
  { label: "Profile", path: ROUTES.profile, icon: User, roles: ["user", "volunteer", "admin"] },
  { label: "Notifications", path: ROUTES.notifications, icon: Bell, roles: ["user", "volunteer", "admin"] },
  { label: "Settings", path: ROUTES.settings, icon: Settings, roles: ["user", "volunteer", "admin"] }
];

export default function Sidebar({ isOpen, onClose }) {
  const { role } = useAuth();
  const availableItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950 p-4 text-white transition lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <span className="font-bold">Menu</span>
          <Button variant="ghost" className="px-2 text-white hover:bg-white/10" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1">
          {availableItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-bold">Verified safety network</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            81 responders online across nearby city zones and high-risk commute routes.
          </p>
        </div>
      </aside>
    </>
  );
}
