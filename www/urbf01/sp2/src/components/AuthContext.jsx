import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('stravaAccessToken') ? true : false;
  });

  const login = (accessToken) => {
    localStorage.setItem('stravaAccessToken', accessToken);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('stravaAccessToken');
    localStorage.removeItem('athlete');
    localStorage.removeItem('activities');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
