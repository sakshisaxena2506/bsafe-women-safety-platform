import {
  Activity,
  Clock,
  MapPinned,
  UsersRound,
  MapPin,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import QuickActions from "../components/dashboard/QuickActions";
import SafetyStatusCard from "../components/dashboard/SafetyStatusCard";
import StatCard from "../components/dashboard/StatCard";

import { useNotifications } from "../context/NotificationContext";
import { useSafety } from "../context/SafetyContext";

import { dashboardStats } from "../data/dashboard";
import { incidents } from "../data/incidents";



const icons = [Activity, Clock, UsersRound, MapPinned];

export default function Dashboard() {
  const navigate = useNavigate();

  const { contacts } = useSafety();
  const { notifications } = useNotifications();

  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude.toFixed(
            4
          )}, ${position.coords.longitude.toFixed(4)}`
        );
      },
      () => {
        setLocation("Location unavailable");
      }
    );
  }, []);

  return (
    <div
      className="relative min-h-screen space-y-6 bg-cover bg-center p-6"
       style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600')",
}}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Card className="bg-white/80 backdrop-blur-md text-center py-10">
          <h1 className="text-5xl font-extrabold text-red-600">
            WOMEN SAFETY SOS
          </h1>

          <p className="mt-2 text-lg font-semibold text-slate-700">
            One Tap Can Save Lives
          </p>

          <p className="mt-3 text-slate-600">
            Press SOS to instantly share your location and notify responders.
          </p>

          <button
            onClick={() => navigate("/sos")}
            className="mt-8 h-44 w-44 rounded-full bg-red-600 text-white text-5xl font-bold shadow-2xl animate-pulse hover:scale-110 transition duration-300"
          >
            SOS
          </button>

          <div className="mt-8 flex justify-center items-center gap-2 text-slate-700">
            <MapPin />
            <span>{location}</span>
          </div>
        </Card>

        {/* Safety Status */}
        <div className="mt-6">
          <SafetyStatusCard />
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              icon={icons[index]}
            />
          ))}
        </div>

        {/* Recent Alerts + Quick Actions */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/80 backdrop-blur-md">
            <h2 className="text-xl font-bold text-slate-950">
              Recent Alerts
            </h2>

            <div className="mt-4 space-y-3">
              {incidents.slice(0, 3).map((incident) => (
                <article
                  key={incident.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <strong>{incident.location}</strong>

                    <p className="mt-1 text-sm text-slate-500">
                      {incident.description}
                    </p>
                  </div>

                  <Badge tone={incident.severity}>
                    {incident.status}
                  </Badge>
                </article>
              ))}
            </div>
          </Card>

          <QuickActions />
        </div>

        {/* Contacts + Notifications */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/80 backdrop-blur-md">
            <h2 className="text-xl font-bold">
              Emergency Contacts Preview
            </h2>

            <div className="mt-4 grid gap-3">
              {contacts.slice(0, 3).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-2xl bg-white/70 p-4"
                >
                  <div>
                    <strong>{contact.name}</strong>

                    <p className="text-sm text-slate-500">
                      {contact.relationship} - {contact.phone}
                    </p>
                  </div>

                  <Badge
                    tone={
                      contact.priority === "Primary"
                        ? "low"
                        : "assigned"
                    }
                  >
                    {contact.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md">
            <h2 className="text-xl font-bold">
              Notifications
            </h2>

            <div className="mt-4 space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-2xl bg-white/70 p-4"
                >
                  <strong>{notification.title}</strong>

                  <p className="mt-1 text-sm text-slate-500">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}