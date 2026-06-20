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
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import PeriodSelector from "@/components/PeriodSelector";
import CategoryDropdown from "@/components/CategoryDropdown";
import TransactionListItem from "@/components/TransactionListItem";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import TransportIcon from "@/assets/images/icons/icon_illustrative_transport.svg";
import FreelanceIcon from "@/assets/images/icons/icon_illustrative_freelance.svg";
import SalaryIcon from "@/assets/images/icons/icon_illustrative_salary.svg";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const timePeriodData = {
  Day: {
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
    data: [300, 150, 500, 400, 700, 200, 350],
  },
  Week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [1200, 800, 1500, 1000, 1800, 900, 700],
  },
  Month: {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    data: [200, 450, 1230, 600, 850, 320],
  },
  Year: {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    data: [5000, 6500, 8000, 7200, 9000, 8500],
  },
};

const mockExpenses = [
  {
    id: "1",
    name: "Starbucks",
    date: "Jan 12, 2022",
    amount: 15000,
    icon: <MealIcon width={32} height={32} />,
    chartIndex: 0,
  },
  {
    id: "2",
    name: "Transfer",
    date: "Yesterday",
    amount: 85000,
    icon: <ShoppingIcon width={32} height={32} />,
    chartIndex: 3,
  },
  {
    id: "3",
    name: "Youtube",
    date: "Jan 16, 2022",
    amount: 11990,
    icon: <TransportIcon width={32} height={32} />,
    chartIndex: 5,
  },
];

const mockIncomes = [
  {
    id: "1",
    name: "Freelance Project",
    date: "Today",
    amount: 850000,
    icon: <FreelanceIcon width={32} height={32} />,
    chartIndex: 1,
  },
  {
    id: "2",
    name: "Monthly Salary",
    date: "Jan 30, 2022",
    amount: 1406000,
    icon: <SalaryIcon width={32} height={32} />,
    chartIndex: 4,
  },
];

export default function StatsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("Month");
  const [selectedCategory, setSelectedCategory] = useState("Expense");
  const [selectedIndex, setSelectedIndex] = useState(2); // May

  const isIncome = selectedCategory === "Income";
  const transactions = isIncome ? mockIncomes : mockExpenses;
  const currentChartData =
    timePeriodData[selectedPeriod as keyof typeof timePeriodData];
  const chartValues = currentChartData.data;
  const selectedValue = chartValues[selectedIndex];
  const maxValue = Math.max(...chartValues);
  const minValue = Math.min(...chartValues);
  const chartHeight = 350;
  const paddingVertical = 40;
  const drawingHeight = chartHeight - paddingVertical * 2;

  // Calculate normalized Y position (inverted because chart goes bottom to top)
  const valueRange = maxValue - minValue || 1;
  const normalizedValue = (selectedValue - minValue) / valueRange;
  const tooltipY = paddingVertical + (1 - normalizedValue) * drawingHeight - 60;

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(88, 164, 159, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.light.tint,
      fill: "white",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "rgba(0,0,0,0.05)",
    },
  };

  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
    setSelectedIndex(0);
  };

  const handleTransactionPress = (chartIndex: number) => {
    setSelectedIndex(chartIndex);
  };

  return (
    <CustomSafeAreaView edges={["bottom", "left", "right"]}>
      <BlurView intensity={50} tint="light" style={styles.blurContainer} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="chevron-left" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Statistics</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={handleSelectPeriod}
        />

        <CategoryDropdown
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View style={styles.chartContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.gradientLeft}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={styles.gradientRight}
          />
          <View
            style={[
              styles.chartValueTag,
              {
                top: tooltipY,
                left:
                  0 +
                  (selectedIndex * (width - 48)) /
                    (currentChartData.labels.length - 1),
              },
            ]}
          >
            <Text style={styles.chartValue}>
              ${selectedValue.toLocaleString()}
            </Text>
            {/* <View style={styles.tagArrow} /> */}
          </View>
          <LineChart
            data={{
              labels: currentChartData.labels,
              datasets: [
                {
                  data: chartValues,
                  color: (opacity = 1) => `rgba(88, 164, 159, ${opacity})`,
                  strokeWidth: 3,
                },
              ],
            }}
            width={width}
            height={350}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withVerticalLines={false}
            withHorizontalLines={true}
            onDataPointClick={({ index }) => setSelectedIndex(index)}
            withInnerLines={true}
          />
        </View>

        <View style={styles.topSectionHeader}>
          <Text style={styles.topSectionTitle}>
            {isIncome ? "Top Earning" : "Top Spending"}
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <FontAwesome name="sort-amount-desc" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {transactions.map((tx) => (
            <TransactionListItem
              key={tx.id}
              name={tx.name}
              date={tx.date}
              amount={tx.amount}
              icon={tx.icon}
              isIncome={isIncome}
              isActive={tx.chartIndex === selectedIndex}
              onPress={() => handleTransactionPress(tx.chartIndex)}
            />
          ))}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  rightPlaceholder: {
    width: 40,
  },
  chartContainer: {
    marginBottom: 32,
    position: "relative",
    overflow: "hidden",
  },
  gradientLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 40,
    zIndex: 5,
  },
  gradientRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 40,
    zIndex: 5,
  },
  chart: {
    borderRadius: 0,
    paddingVertical: 20,
  },
  chartValueTag: {
    position: "absolute",
    top: 30,
    zIndex: 10,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#438883",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  chartValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  tagArrow: {
    position: "absolute",
    bottom: -8,
    width: 16,
    height: 16,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  topSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  topSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  sortButton: {
    padding: 8,
  },
  transactionsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
});
