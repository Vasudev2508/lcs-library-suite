import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import LoginPage from './LoginPage';

const Index = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
};

export default Index;
