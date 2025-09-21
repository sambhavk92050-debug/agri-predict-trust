export type UserRole = 'farmer' | 'government' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location?: string;
  verified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}