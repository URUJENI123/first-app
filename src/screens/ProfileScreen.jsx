"use client";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Appbar,
  Button,
  List,
  Divider,
  Avatar,
} from "react-native-paper";
import { useAuth } from "../services/AuthContext";
import { useExpenses } from "../services/ExpenseContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { expenses, getTotalExpenses, getExpensesByCategory } = useExpenses();

  const totalExpenses = getTotalExpenses();
  const categoryData = getExpensesByCategory();
  const topCategory = Object.keys(categoryData).reduce(
    (a, b) => (categoryData[a] > categoryData[b] ? a : b),
    Object.keys(categoryData)[0]
  );

  const formatCurrency = (amount) => {
    return `$${Number.parseFloat(amount).toFixed(2)}`;
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* User Info Card */}
        <Card style={styles.card}>
          <Card.Content style={styles.userInfo}>
            <Avatar.Text
              size={80}
              label={getInitials(user?.name || "U")}
              style={styles.avatar}
            />
            <Title style={styles.userName}>{user?.name}</Title>
            <Paragraph style={styles.userEmail}>{user?.email}</Paragraph>
          </Card.Content>
        </Card>

        {/* Statistics Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Your Statistics</Title>

            <List.Item
              title="Total Expenses"
              description={formatCurrency(totalExpenses)}
              left={(props) => <List.Icon {...props} icon="currency-usd" />}
            />
            <Divider />

            <List.Item
              title="Total Transactions"
              description={`${expenses.length} expenses`}
              left={(props) => <List.Icon {...props} icon="receipt" />}
            />
            <Divider />

            <List.Item
              title="Average Expense"
              description={
                expenses.length > 0
                  ? formatCurrency(totalExpenses / expenses.length)
                  : "$0.00"
              }
              left={(props) => <List.Icon {...props} icon="calculator" />}
            />
            <Divider />

            {topCategory && (
              <List.Item
                title="Top Category"
                description={`${topCategory} (${formatCurrency(
                  categoryData[topCategory]
                )})`}
                left={(props) => <List.Icon {...props} icon="chart-pie" />}
              />
            )}
          </Card.Content>
        </Card>

        {/* App Info Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>About</Title>

            <List.Item
              title="App Version"
              description="1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
            />
            <Divider />

            <List.Item
              title="Developer"
              description="React Native Weekend Assignment"
              left={(props) => <List.Icon {...props} icon="code-tags" />}
            />
            <Divider />

            <List.Item
              title="Features"
              description="Authentication, CRUD Operations, Real-time Data"
              left={(props) => <List.Icon {...props} icon="feature-search" />}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.logoutButton}
              buttonColor="#d32f2f"
              icon="logout"
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
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
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  userInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#6200EE",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  logoutButton: {
    paddingVertical: 8,
  },
});
