import { createContext, useContext, useMemo, useState } from "react";
import { alerts, alertTimeline } from "../data/alerts";
import { contacts as initialContacts } from "../data/contacts";

const SafetyContext = createContext(null);

export function SafetyProvider({ children }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeAlert, setActiveAlert] = useState(null);
  const [locationStatus, setLocationStatus] = useState({
    sharing: true,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    updatedAt: "Just now"
  });

  function createSosAlert() {
    const alert = {
      id: `ALT-${Date.now()}`,
      status: "active",
      severity: "critical",
      location: "Koramangala 5th Block, Bengaluru",
      coordinates: locationStatus.coordinates,
      createdAt: new Date().toISOString(),
      description: "Emergency SOS triggered from dashboard."
    };

    setActiveAlert(alert);
    return alert;
  }

  function addContact(contact) {
    setContacts((current) => [
      {
        ...contact,
        id: `CON-${Date.now()}`
      },
      ...current
    ]);
  }

  function updateContact(contactId, nextContact) {
    setContacts((current) =>
      current.map((contact) => (contact.id === contactId ? { ...contact, ...nextContact } : contact))
    );
  }

  function deleteContact(contactId) {
    setContacts((current) => current.filter((contact) => contact.id !== contactId));
  }

  const value = useMemo(
    () => ({
      alerts,
      activeAlert,
      alertTimeline,
      contacts,
      locationStatus,
      setLocationStatus,
      createSosAlert,
      addContact,
      updateContact,
      deleteContact
    }),
    [activeAlert, contacts, locationStatus]
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
