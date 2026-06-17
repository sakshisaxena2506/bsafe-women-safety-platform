import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import NotificationCard from "../components/notifications/NotificationCard";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const unread = notifications.filter((notification) => !notification.read);
  const read = notifications.filter((notification) => notification.read);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Notifications</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">{unreadCount} unread updates</h1>
          </div>
          <Button variant="secondary" onClick={markAllAsRead}>Mark all as read</Button>
        </div>
      </Card>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" message="Important safety and responder updates will appear here." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">Unread</h2>
            <div className="space-y-3">
              {unread.length ? unread.map((item) => <NotificationCard key={item.id} notification={item} onRead={markAsRead} />) : <EmptyState title="All caught up" message="There are no unread notifications." />}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">Read</h2>
            <div className="space-y-3">
              {read.map((item) => <NotificationCard key={item.id} notification={item} onRead={markAsRead} />)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
