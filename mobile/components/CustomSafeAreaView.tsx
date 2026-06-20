import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
  backgroundColor?: string;
}

export default function CustomSafeAreaView({
  children,
  edges = ["top", "bottom", "left", "right"],
  backgroundColor = "#fff",
}: CustomSafeAreaViewProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {Platform.OS === "android" && edges.includes("top") && (
        <View style={styles.androidStatusBar} />
      )}
      {/* <SafeAreaView style={styles.safeArea} edges={edges}> */}
      {children}
      {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidStatusBar: {
    height: StatusBar.currentHeight || 0,
  },
  safeArea: {
    flex: 1,
  },
});
