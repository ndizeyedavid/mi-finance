import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import TransportIcon from "@/assets/images/icons/icon_illustrative_transport.svg";
import FreelanceIcon from "@/assets/images/icons/icon_illustrative_freelance.svg";
import SalaryIcon from "@/assets/images/icons/icon_illustrative_salary.svg";

interface Category {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

interface CategoryBreakdownProps {
  onOpenCalendar?: () => void;
}

function formatRWF(amount: number): string {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function CategoryBreakdown({
  onOpenCalendar = () => console.log("Open Calendar pressed"),
}: CategoryBreakdownProps) {
  const colorScheme = useColorScheme();

  const mockCategories: Category[] = [
    {
      id: "1",
      name: "Meals",
      amount: 85000,
      percentage: 35,
      color: "#FF9F43",
      icon: <MealIcon width={32} height={32} />,
    },
    {
      id: "2",
      name: "Shopping",
      amount: 65000,
      percentage: 27,
      color: Colors.light.tint,
      icon: <ShoppingIcon width={32} height={32} />,
    },
    {
      id: "3",
      name: "Transport",
      amount: 40000,
      percentage: 17,
      color: "#26DE81",
      icon: <TransportIcon width={32} height={32} />,
    },
    {
      id: "4",
      name: "Freelance",
      amount: 35000,
      percentage: 14,
      color: "#FD79A8",
      icon: <FreelanceIcon width={32} height={32} />,
    },
    {
      id: "5",
      name: "Salary",
      amount: 17000,
      percentage: 7,
      color: Colors.light.success,
      icon: <SalaryIcon width={32} height={32} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spending Breakdown</Text>
        <TouchableOpacity style={styles.calendarButton} onPress={onOpenCalendar}>
          <FontAwesome name="calendar" size={20} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesContainer}>
        {mockCategories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.iconContainer}>{category.icon}</View>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[styles.bar, { width: `${category.percentage}%`, backgroundColor: category.color }]}
                />
              </View>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{formatRWF(category.amount)}</Text>
              <Text style={styles.percentageText}>{category.percentage}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  calendarButton: {
    padding: 8,
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  barContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 4,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  percentageText: {
    fontSize: 12,
    color: "#888",
  },
});
