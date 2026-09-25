"use client";

import React, { createContext, useContext } from 'react';
import { UserProfile, UserRole } from '../types';
import { useAppStore } from '../store/useAppStore';

interface AuthContextType {
  currentUser: UserProfile;
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  allUsers: UserProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = useAppStore((state) => state.currentUser);
  const switchRole = useAppStore((state) => state.switchUserRole);

  const switchUser = (userId: string) => {
    // Legacy support for user switching
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchUser,
        switchRole,
        allUsers: currentUser.id ? [currentUser] : [],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    const store = useAppStore.getState();
    return {
      currentUser: store.currentUser,
      switchUser: () => {},
      switchRole: store.switchUserRole,
      allUsers: store.currentUser.id ? [store.currentUser] : [],
    };
  }
  return context;
};
