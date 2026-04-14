import { motion } from 'framer-motion';
import { BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { mockIssues } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';

const MyBooksPage = () => {
  const user = useAuthStore((s) => s.user);
  const myIssues = mockIssues.filter((i) => i.userId === user?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">My Books</h1>
        <p className="text-muted-foreground mt-1">Your borrowed books and history</p>
      </div>

      {myIssues.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground mt-4">You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myIssues.map((issue, i) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{issue.bookTitle}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  issue.status === 'overdue' ? 'bg-warning/10 text-warning' :
                  issue.status === 'issued' ? 'bg-info/10 text-info' : 'bg-success/10 text-success'
                }`}>
                  {issue.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due: {issue.dueDate}</span>
                {issue.fine > 0 && (
                  <span className="flex items-center gap-1 text-warning"><AlertTriangle className="w-3.5 h-3.5" /> Fine: ₹{issue.fine}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooksPage;
