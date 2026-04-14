import { create } from 'zustand';
import type { User, UserRole } from '@/types/library';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const mockUsers: Record<UserRole, User> = {
  admin: { id: '1', name: 'Dr. Rajesh Kumar', email: 'admin@cse.edu', role: 'admin', department: 'CSE' },
  librarian: { id: '2', name: 'Priya Sharma', email: 'librarian@cse.edu', role: 'librarian', department: 'CSE Library' },
  student: { id: '3', name: 'Arjun Patel', email: 'student@cse.edu', role: 'student', department: 'CSE - 3rd Year' },
  faculty: { id: '4', name: 'Dr. Meena Iyer', email: 'faculty@cse.edu', role: 'faculty', department: 'CSE - AI/ML' },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (_email, _password, role) => {
    set({ user: mockUsers[role], isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
