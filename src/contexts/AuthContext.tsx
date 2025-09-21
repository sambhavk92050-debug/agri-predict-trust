import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'farmer@demo.com',
    password: 'demo123',
    name: 'Raj Patel',
    role: 'farmer',
    location: 'Punjab, India',
    verified: true
  },
  {
    id: '2',
    email: 'gov@demo.com',
    password: 'demo123',
    name: 'Dr. Anita Sharma',
    role: 'government',
    location: 'New Delhi, India',
    verified: true
  },
  {
    id: '3',
    email: 'business@demo.com',
    password: 'demo123',
    name: 'Vikram Industries',
    role: 'business',
    location: 'Mumbai, India',
    verified: true
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true
      });
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      verified: false
    };
    
    setAuthState({
      user: newUser,
      isAuthenticated: true
    });
    
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};