import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import BusinessIcon from "@/assets/images/icons/icon_illustrative_business.svg";
import SavingIcon from "@/assets/images/icons/icon_illustrative_saving.svg";
import GiftIcon from "@/assets/images/icons/icon_illustrative_gift.svg";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import VacationIcon from "@/assets/images/icons/icon_illustrative_vacation.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import FunIcon from "@/assets/images/icons/icon_illustrative_fun.svg";
import HealthIcon from "@/assets/images/icons/icon_illustrative_health.svg";
import GroceryIcon from "@/assets/images/icons/icon_illustrative_grocery.svg";
import TransportIcon from "@/assets/images/icons/icon_illustrative_transport.svg";
import { Link } from "expo-router";

// Icon map based on goal categories
const iconMap = {
  business: <BusinessIcon width={45} height={45} />,
  saving: <SavingIcon width={45} height={45} />,
  gift: <GiftIcon width={45} height={45} />,
  meal: <MealIcon width={45} height={45} />,
  vacation: <VacationIcon width={45} height={45} />,
  shopping: <ShoppingIcon width={45} height={45} />,
  fun: <FunIcon width={45} height={45} />,
  health: <HealthIcon width={45} height={45} />,
  grocery: <GroceryIcon width={45} height={45} />,
  transport: <TransportIcon width={45} height={45} />,
};

interface Goal {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  category: keyof typeof iconMap;
  completed: boolean;
  deadline?: string;
}

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

function formatRWF(amount: number): string {
  if (amount >= 1000000) {
    return `RWF ${(amount / 1000000).toFixed(0)}k`;
  } else if (amount >= 1000) {
    return `RWF ${(amount / 1000).toFixed(0)}k`;
  }
  return `RWF ${amount}`;
}

export default function GoalCard({ goal, onPress }: GoalCardProps) {
  const progress = Math.min(goal.currentAmount / goal.targetAmount, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <Link
      // @ts-ignore
      href={`/goals/${goal.id}`}
      style={[styles.card, goal.completed && styles.completedCard]}
      asChild
    >
      <TouchableOpacity
        // onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.iconContainer}>{iconMap[goal.category]}</View>
              <View style={styles.titleContainer}>
                <Text
                  style={[styles.title, goal.completed && styles.completedText]}
                >
                  {goal.title}
                </Text>
                {goal.description && (
                  <Text
                    style={[
                      styles.description,
                      goal.completed && styles.completedText,
                    ]}
                  >
                    {goal.description}
                  </Text>
                )}
              </View>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <View style={styles.progressRow}>
            {goal.deadline && (
              <View style={styles.deadlineContainer}>
                <FontAwesome
                  name="clock-o"
                  size={14}
                  color="#888"
                  style={styles.deadlineIcon}
                />
                <Text
                  style={[
                    styles.deadline,
                    goal.completed && styles.completedText,
                  ]}
                >
                  {goal.deadline}
                </Text>
              </View>
            )}
            <View style={styles.percentContainer}>
              <Text
                style={[
                  styles.percentText,
                  { color: goal.completed ? "#888" : Colors.light.tint },
                ]}
              >
                {progressPercent}%
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercent}%`,
                    backgroundColor: goal.completed
                      ? "#888"
                      : Colors.light.tint,
                  },
                ]}
              />
              <View
                style={[
                  styles.progressDot,
                  {
                    transform: [
                      { translateX: progress * 100 + progress * 180 },
                    ],
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.amountRow}>
            <Text
              style={[
                styles.currentAmount,
                goal.completed && styles.completedText,
              ]}
            >
              {formatRWF(goal.currentAmount)}
            </Text>
            <Text
              style={[
                styles.targetAmount,
                goal.completed && styles.completedText,
              ]}
            >
              {formatRWF(goal.targetAmount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "",
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8ECF4",
  },
  completedCard: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#EAECF5",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deadlineIcon: {
    marginRight: 4,
  },
  deadline: {
    fontSize: 13,
    color: "#888",
  },
  percentContainer: {
    backgroundColor: "rgba(88, 164, 159, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  percentText: {
    fontSize: 14,
    fontWeight: "700",
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E8ECF4",
    borderRadius: 5,
    overflow: "visible",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  progressDot: {
    position: "absolute",
    top: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.tint,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  currentAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  targetAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#888",
  },
  completedText: {
    color: "#888",
  },
});
