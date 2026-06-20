import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Svg, Path } from "react-native-svg";
import { Stack, router } from "expo-router";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import CustomInput from "@/components/CustomInput";
import ReusableCalendarModal from "@/components/ReusableCalendarModal";
// Import SVG icons
import BusinessIcon from "@/assets/images/icons/icon_illustrative_business.svg";
import SavingIcon from "@/assets/images/icons/icon_illustrative_saving.svg";
import GiftIcon from "@/assets/images/icons/icon_illustrative_gift.svg";
import VacationIcon from "@/assets/images/icons/icon_illustrative_vacation.svg";
import MealIcon from "@/assets/images/icons/icon_illustrative_meal.svg";
import GroceryIcon from "@/assets/images/icons/icon_illustrative_grocery.svg";
import HealthIcon from "@/assets/images/icons/icon_illustrative_health.svg";
import InvestmentIcon from "@/assets/images/icons/icon_illustrative_investment.svg";
import RentIcon from "@/assets/images/icons/icon_illustrative_rent.svg";
import SalaryIcon from "@/assets/images/icons/icon_illustrative_salary.svg";
import FreelanceIcon from "@/assets/images/icons/icon_illustrative_freelance.svg";
import PassiveIncomeIcon from "@/assets/images/icons/icon_illustrative_passiveincome.svg";
import ShoppingIcon from "@/assets/images/icons/icon_illustrative_shopping.svg";
import FunIcon from "@/assets/images/icons/icon_illustrative_fun.svg";

const { width } = Dimensions.get("window");

type Category =
  | "business"
  | "saving"
  | "gift"
  | "vacation"
  | "meal"
  | "grocery"
  | "health"
  | "investment"
  | "rent"
  | "salary"
  | "freelance"
  | "passiveincome"
  | "shopping"
  | "fun";

const categories = [
  { id: "business", label: "Business", icon: BusinessIcon },
  { id: "saving", label: "Saving", icon: SavingIcon },
  { id: "gift", label: "Gift", icon: GiftIcon },
  { id: "vacation", label: "Vacation", icon: VacationIcon },
  { id: "meal", label: "Snacks", icon: MealIcon },
  { id: "grocery", label: "Grocery", icon: GroceryIcon },
  { id: "health", label: "Health", icon: HealthIcon },
  { id: "investment", label: "Investment", icon: InvestmentIcon },
  { id: "rent", label: "Rent", icon: RentIcon },
  { id: "shopping", label: "Shopping", icon: ShoppingIcon },
  { id: "fun", label: "Fun", icon: FunIcon },
];

function formatRWFInput(text: string): string {
  const numbers = text.replace(/\D/g, "");
  if (!numbers) return "";
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseRWF(text: string): number {
  return parseInt(text.replace(/,/g, ""), 10) || 0;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function NewGoalScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a goal title";
    }

    if (!selectedCategory) {
      newErrors.category = "Please select a category";
    }

    const target = parseRWF(targetAmount);
    if (!target || target <= 0) {
      newErrors.targetAmount = "Please enter a valid target amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Goal saved:", {
        title,
        description,
        targetAmount: parseRWF(targetAmount),
        deadline,
        category: selectedCategory,
      });
      router.back();
    }
  };

  const handleDateSelect = (date: Date) => {
    setDeadline(formatDate(date));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomSafeAreaView
        style={{ flex: 1 }}
        edges={["bottom", "left", "right"]}
        backgroundColor={Colors.light.tint}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* Colored Header Section */}
            <View style={styles.topContainer}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={router.back}
                >
                  <FontAwesome name="chevron-left" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Goal</Text>
                <View style={styles.rightPlaceholder} />
              </View>
            </View>

            {/* Body Container */}
            <View style={styles.bodyContainer}>
              <CustomInput
                label="Goal Title"
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. New Laptop"
                error={errors.title}
              />

              <CustomInput
                label="Description (Optional)"
                value={description}
                onChangeText={setDescription}
                placeholder="What are you saving for?"
                multiline
                numberOfLines={4}
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                  {categories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          selectedCategory === category.id &&
                            styles.selectedCategory,
                        ]}
                        onPress={() =>
                          setSelectedCategory(category.id as Category)
                        }
                      >
                        <CategoryIcon
                          width={32}
                          height={32}
                          color={
                            selectedCategory === category.id
                              ? "white"
                              : Colors.light.tint
                          }
                        />
                        <Text
                          style={[
                            styles.categoryLabel,
                            selectedCategory === category.id &&
                              styles.selectedCategoryLabel,
                          ]}
                        >
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}
              </View>

              <CustomInput
                label="Target Amount"
                value={targetAmount}
                onChangeText={(text) => setTargetAmount(formatRWFInput(text))}
                placeholder="0"
                keyboardType="numeric"
                error={errors.targetAmount}
                rightComponent={<Text style={styles.currencyLabel}>RWF</Text>}
              />

              <View style={styles.dateInputContainer}>
                <CustomInput
                  label="Deadline (Optional)"
                  value={deadline}
                  onChangeText={setDeadline}
                  placeholder="Select a date"
                  editable={false}
                  rightComponent={
                    <TouchableOpacity
                      style={styles.calendarIconButton}
                      activeOpacity={0.7}
                      onPress={() => setShowCalendar(true)}
                    >
                      <FontAwesome name="calendar" size={20} color="#999" />
                    </TouchableOpacity>
                  }
                />
                {/* Overlay to make the whole field pressable */}
                <TouchableOpacity
                  style={styles.dateInputOverlay}
                  activeOpacity={0.7}
                  onPress={() => setShowCalendar(true)}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Create Goal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </CustomSafeAreaView>

      {/* Calendar Modal */}
      <ReusableCalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
      />
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
    paddingTop: 70,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  rightPlaceholder: {
    width: 40,
  },
  curveSvg: {
    marginBottom: -30,
    zIndex: 10,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderRadius: "10px 10px 0 0",
    position: "relative",
    top: -40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryButton: {
    width: "30%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedCategory: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.tint,
    marginTop: 8,
  },
  selectedCategoryLabel: {
    color: "white",
  },
  errorText: {
    fontSize: 13,
    color: Colors.light.danger,
    marginTop: 4,
  },
  dateInputContainer: {
    marginBottom: 24,
    position: "relative",
  },
  calendarIconButton: {
    padding: 4,
  },
  dateInputOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.tint,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginTop: 24,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
  },
});
