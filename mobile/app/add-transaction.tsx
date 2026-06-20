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
import { useLocalSearchParams, router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import CustomInput from "@/components/CustomInput";
import ReusableCalendarModal from "@/components/ReusableCalendarModal";
import { StatusBar } from "expo-status-bar";
import SalaryIcon from "@/assets/images/icons/icon_illustrative_salary.svg";
import FreelanceIcon from "@/assets/images/icons/icon_illustrative_freelance.svg";
import PassiveIncomeIcon from "@/assets/images/icons/icon_illustrative_passiveincome.svg";
import InvestmentIcon from "@/assets/images/icons/icon_illustrative_investment.svg";
import RefundIcon from "@/assets/images/icons/icon_illustrative_refund.svg";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import GroceryIcon from "@/assets/images/icons/icon_illustrative_grocery.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import TransportIcon from "@/assets/images/icons/icon_illustrative_transport.svg";
import HealthIcon from "@/assets/images/icons/icon_illustrative_health.svg";
import FunIcon from "@/assets/images/icons/icon_illustrative_fun.svg";

const { width } = Dimensions.get("window");

type TransactionType = "income" | "expense";

interface Category {
  name: string;
  icon: React.ReactNode;
}

const incomeCategories: Category[] = [
  { name: "Salary", icon: <SalaryIcon width={40} height={40} /> },
  { name: "Freelance", icon: <FreelanceIcon width={40} height={40} /> },
  {
    name: "Passive Income",
    icon: <PassiveIncomeIcon width={40} height={40} />,
  },
  { name: "Investment", icon: <InvestmentIcon width={40} height={40} /> },
  { name: "Refund", icon: <RefundIcon width={40} height={40} /> },
];

const expenseCategories: Category[] = [
  { name: "Meals", icon: <MealIcon width={40} height={40} /> },
  { name: "Grocery", icon: <GroceryIcon width={40} height={40} /> },
  { name: "Shopping", icon: <ShoppingIcon width={40} height={40} /> },
  { name: "Transport", icon: <TransportIcon width={40} height={40} /> },
  { name: "Health", icon: <HealthIcon width={40} height={40} /> },
  { name: "Fun", icon: <FunIcon width={40} height={40} /> },
];

function formatDate(date: Date): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function AddTransactionScreen() {
  const { type } = useLocalSearchParams<{ type: TransactionType }>();
  const isIncome = type === "income";

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    amount?: string;
    category?: string;
  }>({});

  const categories = isIncome ? incomeCategories : expenseCategories;

  const handleSave = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!amount.trim() || parseFloat(amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    if (!selectedCategory) {
      newErrors.category = "Category is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save logic here
    router.back();
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomSafeAreaView edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          <View
            style={[
              styles.topContainer,
              {
                backgroundColor: isIncome
                  ? Colors.light.tint
                  : Colors.light.danger,
              },
            ]}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <FontAwesome name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                Add {isIncome ? "Income" : "Expense"}
              </Text>
              <TouchableOpacity style={styles.moreButton}>
                <FontAwesome name="ellipsis-v" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <ScrollView
              style={styles.formScroll}
              showsVerticalScrollIndicator={false}
            >
              {/* Category selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.categoriesGrid}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.name}
                      style={[
                        styles.categoryButton,
                        selectedCategory === category.name &&
                          styles.selectedCategoryButton,
                      ]}
                      onPress={() => {
                        setSelectedCategory(category.name);
                        setErrors((prev) => ({ ...prev, category: undefined }));
                      }}
                    >
                      <View
                        style={[
                          styles.categoryIconContainer,
                          selectedCategory === category.name &&
                            styles.selectedCategoryIconContainer,
                        ]}
                      >
                        {category.icon}
                      </View>
                      <Text
                        style={[
                          styles.categoryName,
                          selectedCategory === category.name &&
                            styles.selectedCategoryName,
                        ]}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}
              </View>

              {/* Name */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Name</Text>
                <CustomInput
                  label="Transaction Name"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Grocery shopping"
                  error={errors.name}
                />
              </View>

              {/* Amount */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Amount</Text>
                <CustomInput
                  label="Amount (RWF)"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    setErrors((prev) => ({ ...prev, amount: undefined }));
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                  error={errors.amount}
                />
              </View>

              {/* Date */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Date</Text>
                <CustomInput
                  label="Date"
                  value={formatDate(selectedDate)}
                  onChangeText={() => {}}
                  placeholder=""
                  editable={false}
                  rightComponent={
                    <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                      <FontAwesome
                        name="calendar"
                        size={20}
                        color={Colors.light.tint}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>

              {/* Save button */}
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: isIncome
                      ? Colors.light.tint
                      : Colors.light.danger,
                  },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save Transaction</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <ReusableCalendarModal
            visible={calendarVisible}
            onClose={() => setCalendarVisible(false)}
            onDateSelect={handleDateSelect}
          />
        </View>
        <StatusBar style="inverted" />
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
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
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
  moreButton: {
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
    paddingHorizontal: 24,
    position: "relative",
    top: -40,
  },
  formScroll: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  categoryButton: {
    width: (width - 60) / 3,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 20,
    // backgroundColor: "#f5f5f5",
  },
  selectedCategoryButton: {
    // backgroundColor: "rgba(88, 164, 159, 0.1)",
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategoryIconContainer: {
    backgroundColor: "rgba(88, 164, 159, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(88, 164, 159, 0.5)",
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888",
    textAlign: "center",
  },
  selectedCategoryName: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 13,
    color: Colors.light.danger,
    marginTop: 8,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
