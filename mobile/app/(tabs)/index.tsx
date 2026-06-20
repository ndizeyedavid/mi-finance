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
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "@/components/TransactionItem";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import QuickAddButtons from "@/components/QuickAddButtons";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import ReusableCalendarModal from "@/components/ReusableCalendarModal";
import FreelanceIcon from "@/assets/images/icons/icon_illustrative_freelance.svg";
import SalaryIcon from "@/assets/images/icons/icon_illustrative_salary.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import GroceryIcon from "@/assets/images/icons/icon_illustrative_grocery.svg";
import HealthIcon from "@/assets/images/icons/icon_illustrative_health.svg";
import TransportIcon from "@/assets/images/icons/icon_illustrative_transport.svg";
import FunIcon from "@/assets/images/icons/icon_illustrative_fun.svg";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export const mockTransactions = [
  {
    id: "1",
    name: "Freelance Income",
    category: "Freelance",
    date: "Today",
    dateGroup: "TODAY",
    amount: 850000,
    type: "income" as const,
    iconComponent: <FreelanceIcon width={57} height={57} />,
  },
  {
    id: "2",
    name: "Lunch at Kigali",
    category: "Meals",
    date: "Today",
    dateGroup: "TODAY",
    amount: 8500,
    type: "expense" as const,
    iconComponent: <MealIcon width={57} height={57} />,
  },
  {
    id: "3",
    name: "Grocery for Lunar Year",
    category: "Grocery",
    date: "Today",
    dateGroup: "TODAY",
    amount: 35000,
    type: "expense" as const,
    iconComponent: <GroceryIcon width={57} height={57} />,
  },
  {
    id: "4",
    name: "Gym Membership",
    category: "Health",
    date: "Yesterday",
    dateGroup: "YESTERDAY",
    amount: 20000,
    type: "expense" as const,
    iconComponent: <HealthIcon width={57} height={57} />,
  },
  {
    id: "5",
    name: "Freelance Design Project",
    category: "Freelance",
    date: "Yesterday",
    dateGroup: "YESTERDAY",
    amount: 135000,
    type: "income" as const,
    iconComponent: <FreelanceIcon width={57} height={57} />,
  },
  {
    id: "6",
    name: "Coffee & Mile tea",
    category: "Meals",
    date: "Yesterday",
    dateGroup: "YESTERDAY",
    amount: 2500,
    type: "expense" as const,
    iconComponent: <MealIcon width={57} height={57} />,
  },
  {
    id: "7",
    name: "Ride share with Mike",
    category: "Transport",
    date: "Yesterday",
    dateGroup: "YESTERDAY",
    amount: 2500,
    type: "expense" as const,
    iconComponent: <TransportIcon width={57} height={57} />,
  },
  {
    id: "8",
    name: "Monthly Salary",
    category: "Salary",
    date: "Jan 30, 2022",
    dateGroup: "JAN 30, 2022",
    amount: 1406000,
    type: "income" as const,
    iconComponent: <SalaryIcon width={57} height={57} />,
  },
  {
    id: "9",
    name: "Shopping at Simba Supermarket",
    category: "Shopping",
    date: "Jan 16, 2022",
    dateGroup: "JAN 16, 2022",
    amount: 119900,
    type: "expense" as const,
    iconComponent: <ShoppingIcon width={57} height={57} />,
  },
];

export default function HomeScreen() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleOpenCalendar = () => {
    setCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateSelect = (date: Date) => {
    console.log("Selected date:", date);
  };

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    console.log("Selected range:", startDate, endDate);
  };

  return (
    <CustomSafeAreaView edges={["bottom", "left", "right"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good afternoon,</Text>
              <Text style={styles.userName}>David Ndizeye</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <FontAwesome name="bell-o" size={20} color="white" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <Svg
          height={60}
          width={width}
          viewBox={`0 0 ${width} 60`}
          style={styles.curveSvg}
        >
          <Path
            d={`M 0 0 Q ${width / 2} 60 ${width} 0 L ${width} 0 L 0 0 Z`}
            fill={Colors.light.tint}
          />
        </Svg>

        <BalanceCard
          totalBalance={2548000}
          income={1840000}
          expenses={284000}
        />

        <QuickAddButtons />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions History</Text>
          <Link href="/transactions" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.transactionsContainer}>
          {mockTransactions.map((tx) => (
            <TransactionItem key={tx.id} {...tx} />
          ))}
        </View>

        <CategoryBreakdown onOpenCalendar={handleOpenCalendar} />
      </ScrollView>

      <ReusableCalendarModal
        visible={calendarVisible}
        onClose={handleCloseCalendar}
        onDateSelect={handleDateSelect}
        onDateRangeSelect={handleDateRangeSelect}
      />
      <StatusBar style="inverted" />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 110,
  },
  curveSvg: {
    marginBottom: 20,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  seeAllButton: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  transactionsContainer: {
    gap: 8,
    paddingHorizontal: 24,
  },
});
