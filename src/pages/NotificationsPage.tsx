import { motion } from 'framer-motion';
import { Bell, CheckCheck } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';

const typeColors = {
  info: 'border-l-info',
  warning: 'border-l-warning',
  success: 'border-l-success',
  error: 'border-l-destructive',
};

const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">{mockNotifications.filter((n) => !n.read).length} unread</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card rounded-xl p-4 border-l-4 ${typeColors[notif.type]} ${
              !notif.read ? 'bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{notif.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notif.createdAt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
