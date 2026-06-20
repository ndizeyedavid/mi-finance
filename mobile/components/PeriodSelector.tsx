import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const timePeriods = ["Day", "Week", "Month", "Year"];

interface PeriodSelectorProps {
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
}

export default function PeriodSelector({
  selectedPeriod,
  onSelectPeriod,
}: PeriodSelectorProps) {
  return (
    <View style={styles.container}>
      {timePeriods.map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            selectedPeriod === period && styles.activePeriodButton,
          ]}
          onPress={() => onSelectPeriod(period)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.activePeriodButtonText,
            ]}
          >
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  activePeriodButton: {
    backgroundColor: Colors.light.tint,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
  activePeriodButtonText: {
    color: "white",
  },
});
