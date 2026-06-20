import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PasscodeScreen() {
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [step, setStep] = useState<"set" | "confirm">("set");
  const [error, setError] = useState("");
  const inputRef = useRef<any>(null);

  const handleDigitPress = (digit: string) => {
    setError("");
    if (step === "set" && passcode.length < 4) {
      const newPasscode = passcode + digit;
      setPasscode(newPasscode);
      if (newPasscode.length === 4) {
        setTimeout(() => setStep("confirm"), 300);
      }
    } else if (step === "confirm" && confirmPasscode.length < 4) {
      const newConfirm = confirmPasscode + digit;
      setConfirmPasscode(newConfirm);
      if (newConfirm.length === 4) {
        if (newConfirm === passcode) {
          setTimeout(() => router.back(), 500);
        } else {
          setError("Passcodes don't match");
          setTimeout(() => {
            setConfirmPasscode("");
            setStep("set");
            setPasscode("");
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setError("");
    if (step === "set" && passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    } else if (step === "confirm" && confirmPasscode.length > 0) {
      setConfirmPasscode(confirmPasscode.slice(0, -1));
    }
  };

  const renderDots = (code: string) => {
    return (
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[styles.dot, code.length > i && styles.filledDot]}
          />
        ))}
      </View>
    );
  };

  return (
    <CustomSafeAreaView edges={["bottom", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <FontAwesome name="chevron-left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Passcode</Text>
            <View style={{ width: 40 }} />
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>
            {step === "set" ? "Set Passcode" : "Confirm Passcode"}
          </Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {renderDots(step === "set" ? passcode : confirmPasscode)}

          <View style={styles.keypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "delete"].map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.key, item === null && styles.emptyKey]}
                  onPress={() => {
                    if (item === "delete") handleDelete();
                    else if (item !== null) handleDigitPress(item.toString());
                  }}
                  activeOpacity={0.7}
                >
                  {item === "delete" ? (
                    <FontAwesome6 name="delete-left" size={24} color="#333" />
                  ) : item !== null ? (
                    <Text style={styles.keyText}>{item}</Text>
                  ) : null}
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </View>
      <StatusBar style="inverted" />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 48,
    paddingHorizontal: 24,
    position: "relative",
    top: -60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  error: {
    fontSize: 14,
    color: Colors.light.danger,
    textAlign: "center",
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 64,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  filledDot: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 24,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyKey: {
    backgroundColor: "transparent",
  },
  keyText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
  },
});
