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
import { Svg, Path } from "react-native-svg";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import GoalCard from "@/components/GoalCard";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

// Mock goals data
const mockGoals = [
  {
    id: "1",
    title: "New Laptop",
    description: "Save for a new MacBook Pro",
    currentAmount: 450000,
    targetAmount: 1200000,
    category: "business",
    completed: false,
    deadline: "Dec 30, 2026",
  },
  {
    id: "2",
    title: "Emergency Fund",
    description: "Build 6 months of savings buffer",
    currentAmount: 2000000,
    targetAmount: 3000000,
    category: "saving",
    completed: false,
    deadline: "Mar 15, 2027",
  },
  {
    id: "3",
    title: "Birthday Gift",
    description: "Surprise Mom with a nice gift",
    currentAmount: 150000,
    targetAmount: 150000,
    category: "gift",
    completed: true,
    deadline: "Jun 20, 2026",
  },
  {
    id: "4",
    title: "Trip to Zanzibar",
    description: "Vacation for 2 weeks",
    currentAmount: 500000,
    targetAmount: 1800000,
    category: "vacation",
    completed: false,
    deadline: "Aug 10, 2026",
  },
];

export default function GoalsScreen() {
  const [activeFilter, setActiveFilter] = useState<"pending" | "completed">(
    "pending",
  );

  // Filter goals based on active filter
  const filteredGoals = mockGoals.filter((goal) =>
    activeFilter === "pending" ? !goal.completed : goal.completed,
  );

  return (
    <CustomSafeAreaView edges={["bottom", "left", "right"]}>
      {/* <BlurView intensity={50} tint="light" style={styles.blurContainer} /> */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Colored Header Section */}
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <FontAwesome name="chevron-left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Goals</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <FontAwesome name="bell-o" size={20} color="white" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body Container */}
        <View style={styles.bodyContainer}>
          {/* Action Buttons Row */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <FontAwesome name="plus" size={24} color={Colors.light.tint} />
              </View>
              <Text style={styles.actionButtonText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <FontAwesome name="print" size={24} color={Colors.light.tint} />
              </View>
              <Text style={styles.actionButtonText}>Print</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <FontAwesome name="send" size={24} color={Colors.light.tint} />
              </View>
              <Text style={styles.actionButtonText}>Send</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Pills (Twins Style) */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === "pending" && styles.activeFilterPill,
              ]}
              onPress={() => setActiveFilter("pending")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "pending" && styles.activeFilterText,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === "completed" && styles.activeFilterPill,
              ]}
              onPress={() => setActiveFilter("completed")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "completed" && styles.activeFilterText,
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>

          {/* Goals List */}
          <View style={styles.goalsListContainer}>
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <FontAwesome
                  name="target"
                  size={64}
                  color="rgba(150,150,150,0.4)"
                />
                <Text style={styles.emptyTitle}>
                  No {activeFilter} goals yet
                </Text>
                <Text style={styles.emptyDescription}>
                  Start by creating your first budget goal!
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 100,
  },
  topContainer: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 80,
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.danger,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    borderRadius: "10px 10px 0 0",
    position: "relative",
    top: -40,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    padding: 4,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  activeFilterPill: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  filterText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888",
  },
  activeFilterText: {
    color: "#333",
    fontWeight: "700",
  },
  goalsListContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#666",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
  },
});
