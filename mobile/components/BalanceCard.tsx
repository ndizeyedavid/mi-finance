import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

const { width } = Dimensions.get("window");

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
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Total Balance</Text>
          <FontAwesome name="angle-up" size={16} color="white" />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.moreButton}>
            <FontAwesome name="ellipsis-h" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={styles.balanceText}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {formatRWF(totalBalance)}
      </Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome name="arrow-down" size={14} color={"white"} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Income</Text>
            <Text
              style={styles.statAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {formatRWF(income)}
            </Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome name="arrow-up" size={14} color={"white"} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text
              style={styles.statAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {formatRWF(expenses)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 24,
    padding: 24,
    width: width - 48,
    marginBottom: 10,
    position: "absolute",
    top: 150,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 100,
    boxShadow: "0 5px 14px rgba(27, 92, 88, 0.7)",
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  statTextContainer: {
    flex: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
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
