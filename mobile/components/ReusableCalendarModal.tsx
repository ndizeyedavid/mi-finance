import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

interface ReusableCalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
}

// Helper to get days in month
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Helper to get first day of month (0 = Sunday, 1 = Monday, etc.)
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function ReusableCalendarModal({
  visible,
  onClose,
  onDateSelect,
  onDateRangeSelect,
}: ReusableCalendarModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<"single" | "range">("single");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Mock dates with transactions (for dots)
  const mockTransactionDates = [5, 8, 12, 15, 22];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayPress = (day: number) => {
    const date = new Date(year, month, day);
    if (mode === "single") {
      setSelectedDate(date);
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const handleConfirm = () => {
    if (mode === "single" && selectedDate && onDateSelect) {
      onDateSelect(selectedDate);
    } else if (mode === "range" && startDate && endDate && onDateRangeSelect) {
      onDateRangeSelect(startDate, endDate);
    }
    onClose();
  };

  const isDateSelected = (day: number): boolean => {
    if (mode === "single" && selectedDate) {
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      );
    } else if (mode === "range") {
      const date = new Date(year, month, day);
      if (startDate && !endDate) {
        return (
          date.getDate() === startDate.getDate() &&
          date.getMonth() === startDate.getMonth() &&
          date.getFullYear() === startDate.getFullYear()
        );
      } else if (startDate && endDate) {
        return date >= startDate && date <= endDate;
      }
    }
    return false;
  };

  const isInRange = (day: number): boolean => {
    if (mode === "range" && startDate && endDate) {
      const date = new Date(year, month, day);
      return date > startDate && date < endDate;
    }
    return false;
  };

  const hasTransaction = (day: number): boolean => {
    return mockTransactionDates.includes(day);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Date</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, mode === "single" && styles.activeModeButton]}
              onPress={() => setMode("single")}
            >
              <Text
                style={[styles.modeText, mode === "single" && styles.activeModeText]}
              >
                Single Date
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, mode === "range" && styles.activeModeButton]}
              onPress={() => setMode("range")}
            >
              <Text
                style={[styles.modeText, mode === "range" && styles.activeModeText]}
              >
                Date Range
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={goToPrevMonth}>
              <FontAwesome name="chevron-left" size={20} color={Colors.light.tint} />
            </TouchableOpacity>
            <Text style={styles.monthYearText}>
              {monthNames[month]} {year}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <FontAwesome name="chevron-right" size={20} color={Colors.light.tint} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <Text key={index} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.dayCell} />
            ))}
            {daysArray.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  isDateSelected(day) && styles.selectedDayCell,
                  isInRange(day) && styles.inRangeDayCell,
                ]}
                onPress={() => handleDayPress(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    isDateSelected(day) && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
                {hasTransaction(day) && (
                  <View
                    style={[
                      styles.transactionDot,
                      isDateSelected(day) && styles.selectedTransactionDot,
                    ]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
    paddingTop: 24,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  closeButton: {
    padding: 4,
  },
  modeSelector: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
  },
  activeModeButton: {
    backgroundColor: Colors.light.tint,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
  activeModeText: {
    color: "white",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYearText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888",
    width: 40,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayCell: {
    width: 40,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 4,
  },
  selectedDayCell: {
    backgroundColor: Colors.light.tint,
  },
  inRangeDayCell: {
    backgroundColor: "rgba(88, 164, 159, 0.15)",
  },
  dayText: {
    fontSize: 15,
    color: "#000",
    marginBottom: 4,
  },
  selectedDayText: {
    color: "white",
  },
  transactionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.tint,
  },
  selectedTransactionDot: {
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
