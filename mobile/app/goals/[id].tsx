import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

const { width } = Dimensions.get("window");

const iconMap = {
  business: <BusinessIcon width={64} height={64} />,
  saving: <SavingIcon width={64} height={64} />,
  gift: <GiftIcon width={64} height={64} />,
  meal: <MealIcon width={64} height={64} />,
  vacation: <VacationIcon width={64} height={64} />,
  shopping: <ShoppingIcon width={64} height={64} />,
  fun: <FunIcon width={64} height={64} />,
  health: <HealthIcon width={64} height={64} />,
  grocery: <GroceryIcon width={64} height={64} />,
  transport: <TransportIcon width={64} height={64} />,
};

// Mock goal data
const mockGoal = {
  id: "1",
  title: "Vacation",
  description: "Trip to Mexico",
  currentAmount: 175000,
  targetAmount: 250000,
  category: "vacation",
  completed: false,
  deadline: "End: Jul 3rd, 2026",
  startDate: "03 Aug, 2026",
  monthlyTarget: 30000,
  thisMonth: 35000,
  avgMonthly: 33000,
  timeLeft: "3 days 04:15:20",
};

function formatRWF(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(0)}k`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}k`;
  }
  return `$${amount}`;
}

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = Math.min(mockGoal.currentAmount / mockGoal.targetAmount, 1);
  const progressPercent = Math.round(progress * 100);
  const amountLeft = mockGoal.targetAmount - mockGoal.currentAmount;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomSafeAreaView edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <FontAwesome name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
              <View style={styles.headerRightButtons}>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="share-alt" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="ellipsis-v" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* Goal Header */}
              <View style={styles.goalHeader}>
                <View style={styles.goalIconContainer}>
                  {iconMap[mockGoal.category as keyof typeof iconMap]}
                </View>
                <Text style={styles.goalTitle}>{mockGoal.title}</Text>
                <Text style={styles.goalDescription}>
                  {mockGoal.description}
                </Text>
              </View>

              {/* Progress Card */}
              <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressHeaderText}>
                    You've already saved
                  </Text>
                  <FontAwesome
                    name="check-circle"
                    size={20}
                    color={Colors.light.tint}
                  />
                </View>

                <Text style={styles.currentAmount}>
                  ${mockGoal.currentAmount.toLocaleString()}
                </Text>
                <Text style={styles.amountLeft}>
                  {formatRWF(amountLeft)} left
                </Text>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressLabel}>
                      ${(mockGoal.currentAmount / 1000).toFixed(0)}k
                    </Text>
                    <Text style={styles.progressLabel}>
                      ${(mockGoal.targetAmount / 1000).toFixed(0)}k
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${progressPercent}%`,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.progressDot,
                        {
                          transform: [
                            { translateX: progress * (width - 96) - 8 },
                          ],
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              {/* Time Left Card */}
              <View style={styles.timeLeftCard}>
                <View style={styles.timeLeftContent}>
                  <FontAwesome name="clock-o" size={20} color="#666" />
                  <Text style={styles.timeLeftText}>{mockGoal.timeLeft}</Text>
                </View>
                <Text style={styles.deadlineText}>{mockGoal.deadline}</Text>
              </View>

              {/* Goal Statistics */}
              <Text style={styles.sectionTitle}>Goal Statistics</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Monthly Target</Text>
                  <Text style={styles.statValue}>
                    {formatRWF(mockGoal.monthlyTarget)}
                  </Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>This Month</Text>
                  <Text style={[styles.statValue, styles.successText]}>
                    {formatRWF(mockGoal.thisMonth)}
                  </Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Start Date</Text>
                  <Text style={styles.statValue}>{mockGoal.startDate}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Avg. Monthly</Text>
                  <Text style={styles.statValue}>
                    {formatRWF(mockGoal.avgMonthly)}
                  </Text>
                </View>
              </View>

              {/* Add to Goal Button */}
              {/* <TouchableOpacity style={styles.addButton}>
                <FontAwesome
                  name="plus"
                  size={20}
                  color="white"
                  style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>Add to Goal</Text>
              </TouchableOpacity> */}
            </ScrollView>
          </View>
        </View>
        <StatusBar style="light" />
      </CustomSafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    position: "relative",
    top: -40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  goalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  goalIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(88, 164, 159, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 16,
    color: "#666",
  },
  progressCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressHeaderText: {
    fontSize: 14,
    color: "#666",
  },
  currentAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  amountLeft: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
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
    backgroundColor: Colors.light.tint,
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
  timeLeftCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  timeLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeLeftText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  deadlineText: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  successText: {
    color: Colors.light.success,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: Colors.light.tint,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
