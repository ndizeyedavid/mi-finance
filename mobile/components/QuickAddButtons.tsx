import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

interface QuickAddButtonsProps {
  onAddIncome?: () => void;
  onAddExpense?: () => void;
}

export default function QuickAddButtons({
  onAddIncome,
  onAddExpense,
}: QuickAddButtonsProps) {
  return (
    <View style={styles.container}>
      <Link
        href="/add-transaction?type=income"
        style={[styles.button, styles.incomeButton]}
        asChild
      >
        <TouchableOpacity>
          <FontAwesome name="plus-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Add Income</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="/add-transaction?type=expense"
        style={[styles.button, styles.expenseButton]}
        asChild
      >
        <TouchableOpacity>
          <FontAwesome name="minus-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  incomeButton: {
    backgroundColor: Colors.light.tint,
  },
  expenseButton: {
    backgroundColor: Colors.light.danger,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
