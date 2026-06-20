import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

// Default passcode (user will set this in profile later, hardcoded for now)
const SAVED_PASSCODE = "1234";

const PASSCODE_LENGTH = 4;

export default function PasscodeScreen() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleKeyPress = (key: string) => {
    if (passcode.length >= PASSCODE_LENGTH) return;

    const newPasscode = passcode + key;
    setPasscode(newPasscode);
    setError(false);
  };

  const handleDelete = () => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
      setError(false);
    }
  };

  useEffect(() => {
    if (passcode.length === PASSCODE_LENGTH) {
      if (passcode === SAVED_PASSCODE) {
        // Success! Navigate to home
        router.replace("/(tabs)");
        setPasscode("");
        setAttempts(0);
        setError(false);
      } else {
        // Incorrect passcode
        setError(true);
        Vibration.vibrate(500);

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        setTimeout(() => {
          setPasscode("");
        }, 300);

        if (newAttempts >= 3) {
          Alert.alert(
            "Too Many Attempts",
            "Please try again in a few seconds.",
            [{ text: "OK" }],
          );
          setAttempts(0);
        }
      }
    }
  }, [passcode]);

  const renderDigitDots = () => {
    return Array(PASSCODE_LENGTH)
      .fill(0)
      .map((_, index) => (
        <View
          key={index}
          style={[
            styles.digitDot,
            index < passcode.length ? styles.filledDot : styles.emptyDot,
            error && styles.errorDot,
          ]}
        />
      ));
  };

  const renderKeypad = () => {
    const keys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "empty",
      "0",
      "delete",
    ];

    return (
      <View style={styles.keypadContainer}>
        {keys.map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.keypadButton, key === "empty" && styles.emptyKey]}
            disabled={key === "empty"}
            onPress={() => {
              if (key === "delete") {
                handleDelete();
              } else if (key !== "empty") {
                handleKeyPress(key);
              }
            }}
            activeOpacity={key !== "empty" ? 0.7 : 1}
          >
            {key === "delete" ? (
              <FontAwesome6 name="delete-left" size={28} color="#333" />
            ) : key !== "empty" ? (
              <Text style={styles.keypadText}>{key}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={20} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter Passcode</Text>

      <View style={styles.digitContainer}>{renderDigitDots()}</View>

      {error && (
        <Text style={styles.errorText}>Incorrect passcode. Try again.</Text>
      )}

      <View style={styles.keypadWrapper}>{renderKeypad()}</View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 48,
    marginTop: 40,
  },
  digitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 24,
  },
  digitDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  emptyDot: {
    backgroundColor: "#E0E0E0",
  },
  filledDot: {
    backgroundColor: Colors.light.tint,
  },
  errorDot: {
    backgroundColor: Colors.light.danger,
  },
  errorText: {
    color: Colors.light.danger,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  keypadWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 48,
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 320,
    alignSelf: "center",
    gap: 16,
  },
  keypadButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyKey: {
    backgroundColor: "transparent",
  },
  keypadText: {
    fontSize: 32,
    fontWeight: "500",
    color: "#333",
  },
});
