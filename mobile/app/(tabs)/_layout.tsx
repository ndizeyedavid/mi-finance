import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// Tab data
const tabs = [
  { name: "index", label: "Home", icon: "home", width: 120 },
  { name: "stats", label: "Stats", icon: "bar-chart", width: 120 },
  { name: "wallet", label: "Wallet", icon: "credit-card", width: 130 },
  { name: "profile", label: "Profile", icon: "user", width: 135 },
];

function TabButton({
  route,
  isFocused,
  onPress,
}: {
  route: (typeof tabs)[0];
  isFocused: boolean;
  onPress: () => void;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Animated values
  const pillWidth = useSharedValue(isFocused ? route.width : 56);
  const pillOpacity = useSharedValue(isFocused ? 1 : 0);
  const textOpacity = useSharedValue(isFocused ? 1 : 0);

  React.useEffect(() => {
    pillWidth.value = withSpring(isFocused ? route.width : 56, {
      damping: 38,
      stiffness: 250,
    });
    pillOpacity.value = withSpring(isFocused ? 1 : 0, {
      damping: 20,
      stiffness: 250,
    });
    textOpacity.value = withSpring(isFocused ? 1 : 0, {
      damping: 20,
      stiffness: 250,
    });
  }, [isFocused, route.width]);

  // Animated styles
  const pillAnimatedStyle = useAnimatedStyle(() => ({
    width: pillWidth.value,
    opacity: pillOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateX: isFocused ? 0 : -20 }],
  }));

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.pill,
          pillAnimatedStyle,
          { backgroundColor: colors.tint },
        ]}
      >
        <View style={styles.iconContainer}>
          <FontAwesome name={route.icon as any} size={22} color="white" />
        </View>
        <Animated.Text style={[styles.tabText, textAnimatedStyle]}>
          {route.label}
        </Animated.Text>
      </Animated.View>

      {/* Inactive icon */}
      {!isFocused && (
        <View style={styles.inactiveIconContainer}>
          <FontAwesome
            name={route.icon as any}
            size={24}
            color="rgba(150, 150, 150, 0.7)"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const tab = tabs[index];
          if (!tab) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabButton
              key={route.key}
              route={tab}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "relative",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 18 : 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderTopWidth: 0,
  },
  tabButton: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 18,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  inactiveIconContainer: {
    position: "absolute",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
