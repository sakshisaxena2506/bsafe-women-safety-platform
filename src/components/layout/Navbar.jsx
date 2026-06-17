import { Bell, Menu, Moon, Shield, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";
import { ROUTES } from "../../utils/constants";
import Button from "../common/Button";

export default function Navbar({ onMenuClick }) {
  const { unreadCount } = useNotifications();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="px-2 lg:hidden" onClick={onMenuClick} aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to={ROUTES.dashboard} className="flex items-center gap-2 font-extrabold text-slate-950 dark:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-roseguard-500 to-brand-500 text-white">
              <Shield className="h-5 w-5" />
            </span>
            bSafe
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="px-3" onClick={toggleDarkMode} aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link
            to={ROUTES.notifications}
            className="relative grid h-11 w-11 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-roseguard-600 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
