import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ContactsPage from "./pages/ContactsPage";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import IncidentHistory from "./pages/IncidentHistory";
 
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import SOSPage from "./pages/SOSPage";
import SafeZonesPage from "./pages/SafeZonesPage";
import SettingsPage from "./pages/SettingsPage";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import { ROUTES } from "./utils/constants";

export default function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to={ROUTES.login} replace />} />

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["user", "volunteer", "admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.sos} element={<SOSPage />} />
          <Route path={ROUTES.contacts} element={<ContactsPage />} />
          <Route path={ROUTES.safeZones} element={<SafeZonesPage />} />
          <Route path={ROUTES.history} element={<IncidentHistory />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />
          <Route path={ROUTES.notifications} element={<NotificationsPage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["volunteer", "admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.volunteer} element={<VolunteerDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.admin} element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="/home" element={<Navigate to={ROUTES.dashboard} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
