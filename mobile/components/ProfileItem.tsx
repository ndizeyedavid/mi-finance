import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

interface ProfileItemProps {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  rightIcon?: keyof typeof FontAwesome.glyphMap;
  showArrow?: boolean;
  danger?: boolean;
}

export default function ProfileItem({
  icon,
  label,
  value,
  onPress,
  rightIcon,
  showArrow = true,
  danger = false,
}: ProfileItemProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.leftContent}>
        <View
          style={[styles.iconContainer, danger && styles.dangerIconContainer]}
        >
          <FontAwesome
            name={icon}
            size={18}
            color={danger ? Colors.light.danger : Colors.light.tint}
          />
        </View>
        <Text style={[styles.label, danger && styles.dangerLabel]}>
          {label}
        </Text>
      </View>
      <View style={styles.rightContent}>
        {value && <Text style={styles.value}>{value}</Text>}
        {rightIcon && (
          <FontAwesome
            name={rightIcon}
            size={16}
            color="#ccc"
            style={styles.rightIcon}
          />
        )}
        {showArrow && !rightIcon && (
          <FontAwesome
            name="chevron-right"
            size={16}
            color="#ccc"
            style={styles.rightIcon}
          />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(88, 164, 159, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  dangerIconContainer: {
    backgroundColor: "rgba(249, 91, 81, 0.1)",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    flexShrink: 1,
  },
  dangerLabel: {
    color: Colors.light.danger,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    marginLeft: 12,
  },
  value: {
    fontSize: 14,
    color: "#888",
    marginRight: 8,
    flexShrink: 1,
  },
  rightIcon: {
    marginLeft: 4,
  },
});
