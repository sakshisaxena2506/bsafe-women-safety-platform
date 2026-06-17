import { createContext, useContext, useMemo, useState } from "react";
import { notifications as initialNotifications } from "../data/notifications";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  function markAsRead(notificationId) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  function pushNotification(notification) {
    setNotifications((current) => [
      {
        id: `NOT-${Date.now()}`,
        time: "Just now",
        read: false,
        ...notification
      },
      ...current
    ]);
  }

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      pushNotification
    }),
    [notifications, unreadCount]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
}
