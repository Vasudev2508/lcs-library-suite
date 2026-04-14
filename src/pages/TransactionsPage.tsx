import { motion } from 'framer-motion';
import { ArrowLeftRight, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { mockIssues } from '@/data/mockData';

const statusConfig = {
  issued: { icon: Clock, color: 'text-info', bg: 'bg-info/10', label: 'Issued' },
  returned: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Returned' },
  overdue: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', label: 'Overdue' },
};

const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">Issue & return management</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <ArrowLeftRight className="w-4 h-4" /> New Issue
        </motion.button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Book</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue Date</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fine</th>
              </tr>
            </thead>
            <tbody>
              {mockIssues.map((issue, i) => {
                const config = statusConfig[issue.status];
                const Icon = config.icon;
                return (
                  <motion.tr
                    key={issue.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-sm font-medium text-foreground">{issue.bookTitle}</td>
                    <td className="p-4 text-sm text-muted-foreground">{issue.userName}</td>
                    <td className="p-4 text-sm text-muted-foreground">{issue.issueDate}</td>
                    <td className="p-4 text-sm text-muted-foreground">{issue.dueDate}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.color}`}>
                        <Icon className="w-3 h-3" /> {config.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-foreground">
                      {issue.fine > 0 ? `₹${issue.fine}` : '—'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
