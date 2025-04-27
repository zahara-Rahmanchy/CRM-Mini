// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '../utils/decodeToken'; 
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
    if (token) {
      const user = decodeToken(token); // Decoding token to get user info
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


