import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type FilterType = "pending" | "completed";

interface GoalsFilterProps {
  activeFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

export default function GoalsFilter({
  activeFilter,
  onSelectFilter,
}: GoalsFilterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          activeFilter === "pending" && styles.activeFilter,
        ]}
        onPress={() => onSelectFilter("pending")}
      >
        <Text
          style={[
            styles.filterText,
            activeFilter === "pending" && styles.activeText,
          ]}
        >
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          activeFilter === "completed" && styles.activeFilter,
        ]}
        onPress={() => onSelectFilter("completed")}
      >
        <Text
          style={[
            styles.filterText,
            activeFilter === "completed" && styles.activeText,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: Colors.light.tint,
  },
  filterText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#888",
  },
  activeText: {
    color: "white",
  },
});
