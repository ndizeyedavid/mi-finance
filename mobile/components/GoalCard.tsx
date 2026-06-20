import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import BusinessIcon from "@/assets/images/icons/icon_illustrative_business.svg";
import SavingIcon from "@/assets/images/icons/icon_illustrative_saving.svg";
import GiftIcon from "@/assets/images/icons/icon_illustrative_gift.svg";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";

// Icon map based on goal categories
const iconMap = {
  business: <BusinessIcon width={50} height={50} />,
  saving: <SavingIcon width={50} height={50} />,
  gift: <GiftIcon width={50} height={50} />,
  meal: <MealIcon width={50} height={50} />,
  vacation: <BusinessIcon width={50} height={50} />,
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
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function GoalCard({ goal, onPress }: GoalCardProps) {
  const progress = Math.min(goal.currentAmount / goal.targetAmount, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <TouchableOpacity
      style={[styles.card, goal.completed && styles.completedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.iconContainer,
          goal.completed && styles.completedIconContainer,
        ]}
      >
        {iconMap[goal.category]}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, goal.completed && styles.completedText]}>
          {goal.title}
        </Text>
        {goal.description && (
          <Text
            style={[styles.description, goal.completed && styles.completedText]}
          >
            {goal.description}
          </Text>
        )}
        {goal.deadline && (
          <Text
            style={[styles.deadline, goal.completed && styles.completedText]}
          >
            Deadline: {goal.deadline}
          </Text>
        )}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: goal.completed ? "#888" : Colors.light.tint,
                },
              ]}
            />
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
              / {formatRWF(goal.targetAmount)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 30,
  },
  completedCard: {
    // backgroundColor: "#f8f8f8",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  completedIconContainer: {
    backgroundColor: "#e0e0e0",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  deadline: {
    fontSize: 13,
    color: "#888",
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currentAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.tint,
    marginRight: 4,
  },
  targetAmount: {
    fontSize: 13,
    color: "#888",
  },
  completedText: {
    color: "#888",
  },
});
