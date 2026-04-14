import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockBooks, mockIssues } from '@/data/mockData';

const categoryData = mockBooks.reduce((acc, book) => {
  const existing = acc.find((c) => c.name === book.category);
  if (existing) existing.value += book.totalCopies;
  else acc.push({ name: book.category, value: book.totalCopies });
  return acc;
}, [] as { name: string; value: number }[]);

const COLORS = [
  'hsl(217, 91%, 60%)',
  'hsl(262, 83%, 58%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(199, 89%, 48%)',
  'hsl(0, 84%, 60%)',
  'hsl(280, 60%, 50%)',
];

const statusData = [
  { name: 'Issued', value: mockIssues.filter((i) => i.status === 'issued').length },
  { name: 'Returned', value: mockIssues.filter((i) => i.status === 'returned').length },
  { name: 'Overdue', value: mockIssues.filter((i) => i.status === 'overdue').length },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">Library performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Books by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Transaction Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;
