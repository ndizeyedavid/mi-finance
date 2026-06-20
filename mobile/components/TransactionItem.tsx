import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

function formatRWF(amount: number): string {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface TransactionItemProps {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  iconUrl?: string;
  icon?: React.ReactNode;
}

export default function TransactionItem({
  name,
  date,
  amount,
  type,
  iconUrl,
  icon,
}: TransactionItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {iconUrl ? (
          <Image source={{ uri: iconUrl }} style={styles.iconImage} />
        ) : (
          icon
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: type === "income" ? colors.success : colors.danger },
        ]}
      >
        {type === "income" ? "+" : "-"}
        {formatRWF(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
});
