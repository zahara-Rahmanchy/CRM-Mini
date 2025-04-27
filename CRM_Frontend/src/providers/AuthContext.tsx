// context/AuthContext.tsx
import { createContext,  useEffect, useState } from 'react';
import { decodeToken } from '../utils/decodeToken'; 
import Cookies from 'js-cookie';

interface AuthContextType {
  user: any; //type safety
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    console.log('Token from Cookies:', token); // Log the token to check its format
    if (token) {
      try {
        const user = decodeToken(token); // Decoding token to get user info
        setUser(user);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


