import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import AuthImage from "@/assets/images/auth.png";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";

export default function LoginScreen() {
  const [biometricAttempts, setBiometricAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Step 1: Check hardware support
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        console.log("No biometric hardware available");
        setIsLoading(false);
        router.replace("/passcode");
        return;
      }

      // Step 2: Check what biometric types are enrolled
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      console.log("Enrolled security level:", enrolledLevel);

      if (enrolledLevel === LocalAuthentication.SecurityLevel.NONE) {
        console.log("No biometrics enrolled");
        setIsLoading(false);
        router.replace("/passcode");
        return;
      }

      // Step 3: Check available biometric types
      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log("Available biometric types:", biometricTypes);

      // Step 4: Try biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access My Finance",
        cancelLabel: "Use Passcode",
        disableDeviceFallback: true,
        fallbackLabel: "Passcode",
      });

      console.log("Authentication result:", result);

      if (result.success) {
        setIsLoading(false);
        router.replace("/(tabs)");
        setBiometricAttempts(0);
      } else {
        setIsLoading(false);
        handleAuthFailure();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
      router.replace("/passcode");
    }
  };

  const handleAuthFailure = () => {
    const newAttempts = biometricAttempts + 1;
    setBiometricAttempts(newAttempts);

    if (newAttempts >= 3) {
      Alert.alert(
        "Authentication Failed",
        "Too many failed attempts. Please use your passcode.",
        [{ text: "OK", onPress: () => router.replace("/passcode") }],
      );
      setBiometricAttempts(0);
    } else {
      Alert.alert(
        "Authentication Failed",
        `Please try again. ${3 - newAttempts} attempt${3 - newAttempts === 1 ? "" : "s"} remaining.`,
        [
          { text: "Try Again" },
          { text: "Use Passcode", onPress: () => router.replace("/passcode") },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={AuthImage}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 70,
            zIndex: 100,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.title}>Spend Smarter</Text>
        <Text style={styles.subtitle}>Save More</Text>

        <TouchableOpacity
          style={[styles.enterButton, isLoading && styles.disabledButton]}
          onPress={handleEnter}
          disabled={isLoading}
        >
          <Text style={styles.enterButtonText}>
            {isLoading ? "Authenticating..." : "Enter"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>A Product By David</Text>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9F7",
  },
  topSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  bottomSection: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.light.tint,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.light.tint,
    lineHeight: 44,
    marginBottom: 32,
  },
  enterButton: {
    width: "100%",
    backgroundColor: Colors.light.tint,
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  enterButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});
