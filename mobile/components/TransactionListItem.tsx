import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface TransactionListItemProps {
  name: string;
  date: string;
  amount: number;
  icon: React.ReactNode;
  isIncome: boolean;
  isActive?: boolean;
  onPress?: () => void;
}

function formatRWF(amount: number): string {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function TransactionListItem({
  name,
  date,
  amount,
  icon,
  isIncome,
  isActive = false,
  onPress,
}: TransactionListItemProps) {
  return (
    <TouchableOpacity
      style={[styles.transactionCard, isActive && styles.activeTransactionCard]}
      onPress={onPress}
    >
      <View style={[
        styles.transactionIconContainer,
        isActive && styles.activeTransactionIconContainer,
      ]}>
        {icon}
      </View>
      <View style={styles.transactionDetails}>
        <Text style={[
          styles.transactionName,
          isActive && styles.activeTransactionName,
        ]}>
          {name}
        </Text>
        <Text style={[
          styles.transactionDate,
          isActive && styles.activeTransactionDate,
        ]}>
          {date}
        </Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          {
            color: isActive ? "white" : (isIncome ? Colors.light.tint : Colors.light.danger),
          },
        ]}
      >
        {isIncome ? "+" : "-"}
        {formatRWF(amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
  },
  activeTransactionCard: {
    backgroundColor: Colors.light.tint,
  },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activeTransactionIconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  activeTransactionName: {
    color: "white",
  },
  transactionDate: {
    fontSize: 13,
    color: "#888",
  },
  activeTransactionDate: {
    color: "rgba(255,255,255,0.8)",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
