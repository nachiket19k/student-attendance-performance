import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const savedAdmin = localStorage.getItem('admin');
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
    }
  }, [token]);

  const login = ({ token: authToken, admin: adminData }) => {
    setToken(authToken);
    setAdmin(adminData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
