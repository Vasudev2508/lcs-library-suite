import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'accent';
}

const colorMap = {
  primary: 'from-primary/20 to-primary/5 text-primary',
  success: 'from-success/20 to-success/5 text-success',
  warning: 'from-warning/20 to-warning/5 text-warning',
  destructive: 'from-destructive/20 to-destructive/5 text-destructive',
  info: 'from-info/20 to-info/5 text-info',
  accent: 'from-accent/20 to-accent/5 text-accent',
};

const StatCard = ({ title, value, icon, trend, color = 'primary' }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="glass-card rounded-2xl p-6 space-y-3"
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <div>
      <p className="text-3xl font-display font-bold text-foreground">{value}</p>
      {trend && <p className="text-xs text-success mt-1">{trend}</p>}
    </div>
  </motion.div>
);

export default StatCard;
