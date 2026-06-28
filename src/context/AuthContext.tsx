'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserRole } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, role: UserRole) => Promise<void>;
  register: (email: string, username: string, gender: string, role: UserRole) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate initial checking of token/session
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isLoading: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, role: UserRole) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email,
        role,
      };
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Invalid credentials. Please try again.' }));
    }
  };

  const register = async (email: string, username: string, gender: string, role: UserRole) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email,
        username,
        gender,
        role,
      };

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Registration failed. Please try again.' }));
    }
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};



/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */