import { motion } from 'framer-motion';
import { BookOpen, Users, AlertTriangle, IndianRupee, TrendingUp, Clock } from 'lucide-react';
import { mockStats, mockIssues } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const stats = mockStats;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in the library today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Books" value={stats.totalBooks} icon={<BookOpen className="w-5 h-5" />} trend="+3 this week" color="primary" />
        <StatCard title="Issued Books" value={stats.issuedBooks} icon={<TrendingUp className="w-5 h-5" />} color="info" />
        <StatCard title="Overdue" value={stats.overdueBooks} icon={<AlertTriangle className="w-5 h-5" />} color="warning" />
        <StatCard title="Total Members" value={stats.totalMembers} icon={<Users className="w-5 h-5" />} trend="+12 this month" color="success" />
      </div>

      {/* Charts & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {mockIssues.slice(0, 4).map((issue) => (
              <div key={issue.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  issue.status === 'overdue' ? 'bg-warning' : issue.status === 'issued' ? 'bg-info' : 'bg-success'
                }`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{issue.bookTitle}</p>
                  <p className="text-xs text-muted-foreground">{issue.userName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{issue.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fines (Admin/Librarian) */}
      {(user?.role === 'admin' || user?.role === 'librarian') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pending Fines</p>
              <p className="text-2xl font-display font-bold text-foreground">₹{stats.totalFines}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardPage;
