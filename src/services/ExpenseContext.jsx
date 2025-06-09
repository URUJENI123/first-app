"use client"

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "./AuthContext"

const ExpenseContext = createContext()

export const useExpenses = () => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider")
  }
  return context
}

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
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
  ])
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) {
      console.log("Loading expenses for user:", user.id) 
      loadExpenses()
    } else {
      console.log("No user, clearing expenses") 
      setExpenses([]) 
    }
  }, [user?.id]) 

  const loadExpenses = async () => {
    if (!user?.id) {
      console.log("No user ID, cannot load expenses")
      setExpenses([])
      return
    }

    try {
      const storageKey = `expenses_${user.id}`
      console.log("Loading expenses with key:", storageKey) 

      const expensesData = await AsyncStorage.getItem(storageKey)
      if (expensesData) {
        const parsedExpenses = JSON.parse(expensesData)
        console.log(`Loaded ${parsedExpenses.length} expenses for user ${user.id}`) 
        setExpenses(parsedExpenses)
      } else {
        console.log("No expenses found for user:", user.id) 
        setExpenses([])
      }
    } catch (error) {
      console.error("Error loading expenses:", error)
      setExpenses([])
    }
  }

  const saveExpenses = async (expenseList) => {
    if (!user?.id) {
      console.error("Cannot save expenses: No user ID")
      return
    }

    try {
      const storageKey = `expenses_${user.id}`
      console.log(`Saving ${expenseList.length} expenses with key:`, storageKey) 
      await AsyncStorage.setItem(storageKey, JSON.stringify(expenseList))
    } catch (error) {
      console.error("Error saving expenses:", error)
    }
  }

  const addExpense = async (expenseData) => {
    if (!user?.id) {
      return { success: false, error: "User not authenticated" }
    }

    try {
      const newExpense = {
        id: `expense_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...expenseData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      }

      console.log("Adding expense for user:", user.id, newExpense) 

      const updatedExpenses = [...expenses, newExpense]
      setExpenses(updatedExpenses)
      await saveExpenses(updatedExpenses)

      return { success: true }
    } catch (error) {
      console.error("Error adding expense:", error)
      return { success: false, error: "Failed to add expense" }
    }
  }

  const updateExpense = async (expenseId, expenseData) => {
    if (!user?.id) {
      return { success: false, error: "User not authenticated" }
    }

    try {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === expenseId && expense.userId === user.id
          ? { ...expense, ...expenseData, userId: user.id } 
          : expense,
      )

      setExpenses(updatedExpenses)
      await saveExpenses(updatedExpenses)

      return { success: true }
    } catch (error) {
      console.error("Error updating expense:", error)
      return { success: false, error: "Failed to update expense" }
    }
  }

  const deleteExpense = async (expenseId) => {
    if (!user?.id) {
      return { success: false, error: "User not authenticated" }
    }

    try {
      // Only delete expenses that belong to the current user
      const updatedExpenses = expenses.filter((expense) => !(expense.id === expenseId && expense.userId === user.id))

      console.log(`Deleting expense ${expenseId} for user ${user.id}`) 

      setExpenses(updatedExpenses)
      await saveExpenses(updatedExpenses)

      return { success: true }
    } catch (error) {
      console.error("Error deleting expense:", error)
      return { success: false, error: "Failed to delete expense" }
    }
  }

  const getTotalExpenses = () => {
    // Only calculate total for current user's expenses
    return expenses
      .filter((expense) => expense.userId === user?.id)
      .reduce((total, expense) => total + Number.parseFloat(expense.amount), 0)
  }

  const getExpensesByCategory = () => {
    const categoryTotals = {}

    // Only process current user's expenses
    expenses
      .filter((expense) => expense.userId === user?.id)
      .forEach((expense) => {
        if (categoryTotals[expense.category]) {
          categoryTotals[expense.category] += Number.parseFloat(expense.amount)
        } else {
          categoryTotals[expense.category] = Number.parseFloat(expense.amount)
        }
      })

    return categoryTotals
  }

  const value = {
    expenses: expenses.filter((expense) => expense.userId === user?.id), 
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getExpensesByCategory,
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}
