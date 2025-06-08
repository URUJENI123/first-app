"use client";

import { useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Appbar,
  FAB,
  Searchbar,
  Menu,
  Divider,
} from "react-native-paper";
import { useExpenses } from "../services/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";

export default function ExpenseListScreen({ navigation }) {
  const { expenses, deleteExpense, categories } = useExpenses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedExpenses = filteredExpenses.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleDeleteExpense = (expenseId, expenseTitle) => {
    Alert.alert(
      "Delete Expense",
      `Are you sure you want to delete "${expenseTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const result = await deleteExpense(expenseId);
            if (!result.success) {
              Alert.alert("Error", result.error);
            }
          },
        },
      ]
    );
  };

  const renderExpenseItem = ({ item }) => (
    <ExpenseCard expense={item} onDelete={handleDeleteExpense} />
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Expenses" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="filter-variant"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedCategory("All");
              setMenuVisible(false);
            }}
            title="All Categories"
            leadingIcon={selectedCategory === "All" ? "check" : undefined}
          />
          <Divider />
          {categories.map((category) => (
            <Menu.Item
              key={category}
              onPress={() => {
                setSelectedCategory(category);
                setMenuVisible(false);
              }}
              title={category}
              leadingIcon={selectedCategory === category ? "check" : undefined}
            />
          ))}
        </Menu>
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Search expenses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <FlatList
          data={sortedExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Title style={styles.emptyTitle}>No expenses found</Title>
                <Paragraph style={styles.emptyText}>
                  {searchQuery || selectedCategory !== "All"
                    ? "Try adjusting your search or filter"
                    : "Add your first expense to get started!"}
                </Paragraph>
              </Card.Content>
            </Card>
          }
        />
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Add Expense")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  emptyCard: {
    marginTop: 40,
    elevation: 2,
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
