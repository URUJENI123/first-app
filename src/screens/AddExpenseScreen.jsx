"use client";

import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Card,
  Text,
  Appbar,
  HelperText,
  Menu,
} from "react-native-paper";
import { useExpenses } from "../services/ExpenseContext";

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);

  const { addExpense, categories } = useExpenses();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (
      isNaN(Number.parseFloat(amount)) ||
      Number.parseFloat(amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const expenseData = {
      title: title.trim(),
      amount: Number.parseFloat(amount),
      category,
      description: description.trim(),
    };

    const result = await addExpense(expenseData);
    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Expense added successfully!", [
        {
          text: "Add Another",
          onPress: () => {
            setTitle("");
            setAmount("");
            setCategory("");
            setDescription("");
            setErrors({});
          },
        },
        {
          text: "View Dashboard",
          onPress: () => navigation.navigate("Dashboard"),
        },
      ]);
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Appbar.Header>
        <Appbar.Content title="Add Expense" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>New Expense</Text>

            <TextInput
              label="Expense Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., Lunch at restaurant"
              error={!!errors.title}
            />
            <HelperText type="error" visible={!!errors.title}>
              {errors.title}
            </HelperText>

            <TextInput
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="0.00"
              left={<TextInput.Affix text="$" />}
              error={!!errors.amount}
            />
            <HelperText type="error" visible={!!errors.amount}>
              {errors.amount}
            </HelperText>

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TextInput
                  label="Category"
                  value={category}
                  mode="outlined"
                  style={styles.input}
                  placeholder="Select a category"
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="chevron-down"
                      onPress={() => setMenuVisible(true)}
                    />
                  }
                  onPress={() => setMenuVisible(true)}
                  error={!!errors.category}
                />
              }
            >
              {categories.map((cat) => (
                <Menu.Item
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    setMenuVisible(false);
                  }}
                  title={cat}
                />
              ))}
            </Menu>
            <HelperText type="error" visible={!!errors.category}>
              {errors.category}
            </HelperText>

            <TextInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder="Add any additional notes..."
            />

            <Button
              mode="contained"
              onPress={handleAddExpense}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Add Expense
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
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
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
});
