import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Chip, IconButton } from "react-native-paper";

const ExpenseCard = ({ expense, onDelete }) => {
  const formatCurrency = (amount) => {
    return `$${Number.parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.info}>
            <Title style={styles.title}>{expense.title}</Title>
            <Paragraph style={styles.amount}>
              {formatCurrency(expense.amount)}
            </Paragraph>
          </View>
          {onDelete && (
            <IconButton
              icon="delete"
              size={20}
              onPress={() => onDelete(expense.id, expense.title)}
            />
          )}
        </View>

        <View style={styles.details}>
          <Chip mode="outlined" compact style={styles.categoryChip}>
            {expense.category}
          </Chip>
          <Paragraph style={styles.date}>
            {formatDate(expense.createdAt)}
          </Paragraph>
        </View>

        {expense.description ? (
          <Paragraph style={styles.description}>
            {expense.description}
          </Paragraph>
        ) : null}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200EE",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  categoryChip: {
    height: 28,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

export default ExpenseCard;
