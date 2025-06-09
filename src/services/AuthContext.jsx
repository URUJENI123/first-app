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
      const userData = await AsyncStorage.getItem("currentUser");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log("Loaded user:", parsedUser); // Debug log
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Get all users
      const users = await AsyncStorage.getItem("allUsers");
      const userList = users ? JSON.parse(users) : [];

      // Find user with matching credentials
      const foundUser = userList.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Create clean user object with consistent ID
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };

        console.log("Logging in user:", userData); // Debug log

        // Store current user separately
        await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Get existing users
      const users = await AsyncStorage.getItem("allUsers");
      const userList = users ? JSON.parse(users) : [];

      // Check if user already exists
      const existingUser = userList.find((u) => u.email === email);
      if (existingUser) {
        return { success: false, error: "User already exists" };
      }

      // Create new user with unique ID
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // More unique ID
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
      };

      console.log("Registering new user:", newUser); // Debug log

      // Add to user list
      userList.push(newUser);
      await AsyncStorage.setItem("allUsers", JSON.stringify(userList));

      // Set as current user
      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user:", user); // Debug log
      await AsyncStorage.removeItem("currentUser");
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
