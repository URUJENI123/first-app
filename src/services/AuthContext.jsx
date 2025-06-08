"use client";

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      const users = await AsyncStorage.getItem("users");
      const userList = users ? JSON.parse(users) : [];

      const foundUser = userList.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const users = await AsyncStorage.getItem("users");
      const userList = users ? JSON.parse(users) : [];

      // Check if user already exists
      const existingUser = userList.find((u) => u.email === email);
      if (existingUser) {
        return { success: false, error: "User already exists" };
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      userList.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(userList));

      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
