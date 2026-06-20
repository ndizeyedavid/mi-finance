import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

function formatRWF(amount: number): string {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface BalanceCardProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

export default function BalanceCard({
  totalBalance,
  income,
  expenses,
}: BalanceCardProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Balance</Text>
        <View style={styles.headerRight}>
          <FontAwesome name="angle-up" size={16} color="white" />
          <TouchableOpacity style={styles.moreButton}>
            <FontAwesome name="ellipsis-h" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.balanceText}>{formatRWF(totalBalance)}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome
              name="arrow-down"
              size={14}
              color={Colors.light.tint}
            />
          </View>
          <View>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount}>{formatRWF(income)}</Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome name="arrow-up" size={14} color={Colors.light.tint} />
          </View>
          <View>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount}>{formatRWF(expenses)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moreButton: {
    padding: 4,
  },
  balanceText: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 2,
  },
  statAmount: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
