import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types/library';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/library-hero.jpg';

const roles: { role: UserRole; label: string; desc: string }[] = [
  { role: 'admin', label: 'Admin', desc: 'Full system access' },
  { role: 'librarian', label: 'Librarian', desc: 'Manage books & issues' },
  { role: 'student', label: 'Student', desc: 'Browse & borrow books' },
  { role: 'faculty', label: 'Faculty', desc: 'Extended borrowing' },
];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login('demo@cse.edu', 'demo', selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img src={heroImage} alt="Digital library" className="absolute inset-0 w-full h-full object-cover" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-md">
          <h2 className="text-4xl font-display font-bold text-primary-foreground leading-tight">Empowering Knowledge,<br />One Book at a Time</h2>
          <p className="text-primary-foreground/70 mt-3">CSE Department Digital Library System</p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center gradient-mesh p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-card-elevated rounded-2xl p-8 space-y-8">
          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center"
            >
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-foreground">CSE Library</h1>
            <p className="text-muted-foreground text-sm">Department Library Management System</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Select your role to continue</label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(({ role, label, desc }, i) => (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedRole === role
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <span className="font-semibold text-sm text-foreground block">{label}</span>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            Continue as {roles.find((r) => r.role === selectedRole)?.label}
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <p className="text-center text-xs text-muted-foreground">
            Demo mode — no credentials required
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
