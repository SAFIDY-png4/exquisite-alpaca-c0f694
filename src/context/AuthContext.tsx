import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  error: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Identifiants admin
const ADMIN_EMAIL = 'sitrakiniaina.rinah.safidy@gmail.com';
const ADMIN_PASSWORD = '@Safidy15';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('admin_auth');
    return saved === 'true';
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('admin_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (email: string, password: string): boolean => {
    setError('');
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    } else {
      setError('Email ou mot de passe incorrect');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setError('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
