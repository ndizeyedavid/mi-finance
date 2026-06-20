
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "@/constants/Colors";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  rightComponent?: React.ReactNode;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  editable?: boolean;
}

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder = "",
  error,
  multiline = false,
  numberOfLines = 1,
  rightComponent,
  keyboardType = "default",
  editable = true,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={[styles.inputContainer, error && styles.errorContainer]}>
          <Text
            style={[
              styles.label,
              isFocused && styles.focusedLabel,
              (value || isFocused) && styles.floatedLabel,
              error && styles.errorLabel,
            ]}
          >
            {label}
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                multiline && styles.textArea,
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholder={isFocused ? placeholder : ""}
              placeholderTextColor="#999"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              multiline={multiline}
              numberOfLines={numberOfLines}
              keyboardType={keyboardType}
              editable={editable}
              selectionColor={Colors.light.tint}
            />
            {rightComponent}
          </View>
          <View
            style={[
              styles.bottomBorder,
              isFocused && styles.focusedBorder,
              error && styles.errorBorder,
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 8,
    paddingHorizontal: 12,
    position: "relative",
  },
  errorContainer: {
    backgroundColor: "#fff5f5",
  },
  label: {
    fontSize: 16,
    color: "#888",
    position: "absolute",
    top: 16,
    left: 12,
  },
  floatedLabel: {
    top: 8,
    fontSize: 12,
  },
  focusedLabel: {
    color: Colors.light.tint,
  },
  errorLabel: {
    color: Colors.light.danger,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    paddingTop: 12,
    paddingBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  bottomBorder: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 4,
  },
  focusedBorder: {
    height: 2,
    backgroundColor: Colors.light.tint,
  },
  errorBorder: {
    height: 2,
    backgroundColor: Colors.light.danger,
  },
  errorText: {
    fontSize: 13,
    color: Colors.light.danger,
    marginTop: 4,
  },
});
