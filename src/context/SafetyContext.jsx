import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { alertTimeline } from "../data/alerts";
import { contacts as fallbackContacts } from "../data/contacts";
import { getCurrentPosition } from "../utils/geolocation";
import { useAuth } from "./AuthContext";
import {
  createAlert,
  listAlerts,
  listContacts,
  listSafeZones,
  removeContact,
  saveContact,
  updateAlertStatus
} from "../services/databaseService";

const SafetyContext = createContext(null);

function mapAlertFromSupabase(alert) {
  return {
    id: alert.id,
    userId: alert.user_id,
    createdAt: alert.created_at || alert.timestamp,
    status: alert.status,
    severity: alert.severity || "critical",
    location: alert.location || "Live location",
    coordinates: {
      lat: Number(alert.latitude),
      lng: Number(alert.longitude)
    },
    responder: alert.responder || "Pending responder",
    description: alert.description || "Emergency SOS alert triggered."
  };
}

export function SafetyProvider({ children }) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState(fallbackContacts);
  const [alerts, setAlerts] = useState([]);
  const [safeZones, setSafeZones] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);
  const [isSafetyLoading, setIsSafetyLoading] = useState(false);
  const [safetyError, setSafetyError] = useState("");
  const [locationStatus, setLocationStatus] = useState({
    sharing: false,
    accuracy: null,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    updatedAt: "Awaiting permission"
  });

  useEffect(() => {
    let mounted = true;

    async function loadSafetyWorkspace() {
      setIsSafetyLoading(true);
      setSafetyError("");

      try {
        const [nextContacts, nextAlerts, nextSafeZones] = await Promise.all([
          listContacts(user?.id),
          listAlerts(user?.id, user?.role),
          listSafeZones()
        ]);

        if (!mounted) {
          return;
        }

        const mappedAlerts = nextAlerts.map((alert) => (alert.latitude ? mapAlertFromSupabase(alert) : alert));
        setContacts(nextContacts);
        setAlerts(mappedAlerts);
        setSafeZones(nextSafeZones);
        setActiveAlert(mappedAlerts.find((alert) => alert.status === "active") || null);
      } catch (error) {
        if (mounted) {
          setSafetyError(error.message);
          toast.error(error.message);
        }
      } finally {
        if (mounted) {
          setIsSafetyLoading(false);
        }
      }
    }

    loadSafetyWorkspace();

    return () => {
      mounted = false;
    };
  }, [user?.id, user?.role]);

  async function refreshLocation() {
    const position = await getCurrentPosition();
    const nextLocation = {
      sharing: true,
      accuracy: position.accuracy,
      coordinates: { lat: position.latitude, lng: position.longitude },
      updatedAt: new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(position.timestamp))
    };

    setLocationStatus(nextLocation);
    return nextLocation;
  }

  async function createSosAlert() {
    setSafetyError("");

    try {
      const nextLocation = await refreshLocation();
      const payload = {
        user_id: user?.id,
        latitude: nextLocation.coordinates.lat,
        longitude: nextLocation.coordinates.lng,
        timestamp: new Date().toISOString(),
        status: "active",
        severity: "critical",
        location: user?.address || "Live location",
        description: "Emergency SOS triggered from bSafe."
      };

      const savedAlert = await createAlert(payload);
      const alert = savedAlert.latitude ? mapAlertFromSupabase(savedAlert) : {
        id: savedAlert.id || `ALT-${Date.now()}`,
        userId: user?.id,
        createdAt: payload.timestamp,
        status: "active",
        severity: "critical",
        location: payload.location,
        coordinates: nextLocation.coordinates,
        responder: "Pending responder",
        description: payload.description
      };

      setActiveAlert(alert);
      setAlerts((current) => [alert, ...current]);
      toast.success("SOS alert saved and shared with responders.");
      return alert;
    } catch (error) {
      setSafetyError(error.message);
      toast.error(error.message);
      throw error;
    }
  }

  async function addContact(contact) {
    const payload = {
      ...contact,
      user_id: user?.id,
      id: contact.id || `CON-${Date.now()}`
    };
    const savedContact = await saveContact(payload);
    setContacts((current) => [savedContact, ...current]);
    toast.success("Emergency contact added.");
  }

  async function updateContact(contactId, nextContact) {
    const payload = { ...nextContact, id: contactId, user_id: user?.id };
    const savedContact = await saveContact(payload);
    setContacts((current) =>
      current.map((contact) => (contact.id === contactId ? { ...contact, ...savedContact } : contact))
    );
    toast.success("Emergency contact updated.");
  }

  async function deleteContact(contactId) {
    await removeContact(contactId);
    setContacts((current) => current.filter((contact) => contact.id !== contactId));
    toast.success("Emergency contact removed.");
  }

  async function updateResponderStatus(alertId, status) {
    const savedAlert = await updateAlertStatus(alertId, status, user?.id);
    setAlerts((current) =>
      current.map((alert) => (alert.id === alertId ? { ...alert, ...savedAlert, status } : alert))
    );
    toast.success(`Alert marked as ${status}.`);
  }

  const value = useMemo(
    () => ({
      alerts,
      activeAlert,
      alertTimeline,
      contacts,
      safeZones,
      locationStatus,
      isSafetyLoading,
      safetyError,
      setLocationStatus,
      refreshLocation,
      createSosAlert,
      addContact,
      updateContact,
      deleteContact,
      updateResponderStatus
    }),
    [activeAlert, alerts, contacts, isSafetyLoading, locationStatus, safeZones, safetyError]
  );

  return <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>;
}

export function useSafety() {
  const context = useContext(SafetyContext);

  if (!context) {
    throw new Error("useSafety must be used inside SafetyProvider");
  }

  return context;
}
