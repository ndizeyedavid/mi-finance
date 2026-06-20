import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

interface QuickAddButtonsProps {
  onAddIncome?: () => void;
  onAddExpense?: () => void;
}

export default function QuickAddButtons({
  onAddIncome = () => console.log("Add Income pressed"),
  onAddExpense = () => console.log("Add Expense pressed"),
}: QuickAddButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.incomeButton]}
        onPress={onAddIncome}
      >
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={styles.buttonText}>Add Income</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.expenseButton]}
        onPress={onAddExpense}
      >
        <FontAwesome name="minus-circle" size={24} color="white" />
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
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
