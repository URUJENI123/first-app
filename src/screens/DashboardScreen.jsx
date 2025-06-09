"use client";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card, Text, Appbar, Chip } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { useAuth } from "../services/AuthContext";
import { useExpenses } from "../services/ExpenseContext";
import StatCard from "../components/StatCard";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const { user } = useAuth();
  const { expenses, getTotalExpenses, getExpensesByCategory } = useExpenses();

  const totalExpenses = getTotalExpenses();
  const categoryData = getExpensesByCategory();

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const chartData = Object.keys(categoryData).map((category, index) => ({
    name: category,
    amount: categoryData[category],
    color: `hsl(${index * 45}, 70%, 60%)`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  const formatCurrency = (amount) => {
    return `$${Number.parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={`Welcome, ${user?.name}`} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {/* Total Expenses Card */}
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          subtitle={`${expenses.length} transactions`}
          style={styles.totalCard}
        />

        {/* Category Breakdown */}
        {chartData.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Expenses by Category</Text>
              <PieChart
                data={chartData}
                width={screenWidth - 60}
                height={220}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </Card.Content>
          </Card>
        )}

        {/* Recent Expenses */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Recent Expenses</Text>
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseTitle}>
                      {expense.title}
                    </Text>
                    <View style={styles.expenseDetails}>
                      <Chip mode="outlined" compact style={styles.categoryChip}>
                        {expense.category}
                      </Chip>
                      <Text style={styles.expenseDate}>
                        {formatDate(expense.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.expenseAmount}>
                    {formatCurrency(expense.amount)}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noExpenses}>
                No expenses yet. Add your first expense!
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Categories"
            value={Object.keys(categoryData).length}
            style={styles.statCard}
          />
          <StatCard
            title="Avg. Expense"
            value={
              expenses.length > 0
                ? formatCurrency(totalExpenses / expenses.length)
                : "$0.00"
            }
            style={styles.statCard}
          />
        </View>
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
  totalCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  expenseDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryChip: {
    height: 24,
  },
  expenseDate: {
    fontSize: 12,
    color: "#666",
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200EE",
  },
  noExpenses: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    paddingVertical: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
  },
});
