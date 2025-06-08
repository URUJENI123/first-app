"use client";

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState([
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Education",
    "Other",
  ]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    try {
      const expensesData = await AsyncStorage.getItem(`expenses_${user.id}`);
      if (expensesData) {
        setExpenses(JSON.parse(expensesData));
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const saveExpenses = async (expenseList) => {
    try {
      await AsyncStorage.setItem(
        `expenses_${user.id}`,
        JSON.stringify(expenseList)
      );
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = {
        id: Date.now().toString(),
        ...expenseData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      };

      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      await saveExpenses(updatedExpenses);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to add expense" };
    }
  };

  const updateExpense = async (expenseId, expenseData) => {
    try {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === expenseId ? { ...expense, ...expenseData } : expense
      );

      setExpenses(updatedExpenses);
      await saveExpenses(updatedExpenses);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update expense" };
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      );
      setExpenses(updatedExpenses);
      await saveExpenses(updatedExpenses);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete expense" };
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + Number.parseFloat(expense.amount),
      0
    );
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += Number.parseFloat(expense.amount);
      } else {
        categoryTotals[expense.category] = Number.parseFloat(expense.amount);
      }
    });
    return categoryTotals;
  };

  const value = {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getExpensesByCategory,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
