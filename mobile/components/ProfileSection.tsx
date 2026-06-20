import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function ProfileSection({
  title,
  children,
}: ProfileSectionProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 12,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
  },
});
