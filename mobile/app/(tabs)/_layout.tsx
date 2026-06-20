import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// SVG-like custom icons as Reanimated components
function HomeIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.2 : 1);
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <FontAwesome name="home" size={size} color={color} />
    </Animated.View>
  );
}

function StatsIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.2 : 1);
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <View style={styles.statsIconContainer}>
        <View
          style={[
            styles.statsBar,
            { height: size * 0.4, backgroundColor: color },
          ]}
        />
        <View
          style={[
            styles.statsBar,
            { height: size * 0.6, backgroundColor: color },
          ]}
        />
        <View
          style={[
            styles.statsBar,
            { height: size * 0.9, backgroundColor: color },
          ]}
        />
        <View
          style={[
            styles.statsBar,
            { height: size * 0.6, backgroundColor: color },
          ]}
        />
      </View>
    </Animated.View>
  );
}

function WalletIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.2 : 1);
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <FontAwesome name="credit-card" size={size} color={color} />
    </Animated.View>
  );
}

function ProfileIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.2 : 1);
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <FontAwesome name="user-circle-o" size={size} color={color} />
    </Animated.View>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const activeColor = colors.tint;
  const inactiveColor = "rgba(150, 150, 150, 0.6)";

  const tabIcons = [
    HomeIcon,
    StatsIcon,
    null, // FAB placeholder
    WalletIcon,
    ProfileIcon,
  ];

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const IconComponent = tabIcons[index];
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

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          if (IconComponent === null) {
            return <View key={route.key} style={styles.fabPlaceholder} />;
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <IconComponent
                color={isFocused ? activeColor : inactiveColor}
                size={24}
                focused={isFocused}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <View style={styles.fabInner}>
          <FontAwesome name="plus" size={28} color="white" />
        </View>
      </TouchableOpacity>
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
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 18 : 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    paddingHorizontal: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderTopWidth: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  statsIconContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  statsBar: {
    width: 4,
    borderRadius: 3,
  },
  fabPlaceholder: {
    width: 72,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? 38 : 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  fabInner: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
});
