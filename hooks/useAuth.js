import { useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../lib/storage';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialAuth();
  }, []);

  const checkInitialAuth = async () => {
    try {
      const storedUser = await getItem('user_session');
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    await setItem('user_session', userData);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await removeItem('user_session');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
