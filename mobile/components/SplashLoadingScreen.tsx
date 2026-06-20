import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";

export default function SplashLoadingScreen() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withSequence(
      // Fast start to 80%
      withTiming(0.8, {
        duration: 1200,
        easing: Easing.out(Easing.ease),
      }),
      // Slow finish to 100%
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, []);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#63B5AF", "#438883"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <Image
        source={require("../assets/images/bg-texture.png")}
        style={styles.texture}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Mi Finance</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressBarStyle]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  texture: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 48,
  },
  progressContainer: {
    width: "65%",
    maxWidth: 280,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
});
