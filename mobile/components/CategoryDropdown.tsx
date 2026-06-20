import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

const categories = ["Expense", "Income"];

interface CategoryDropdownProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryDropdown({
  selectedCategory,
  onSelectCategory,
}: CategoryDropdownProps) {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.categoryDropdown}
          activeOpacity={0.8}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.categoryText}>{selectedCategory}</Text>
          <FontAwesome name="chevron-down" size={12} color="#888" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownModal}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.dropdownItem,
                    selectedCategory === cat && styles.selectedDropdownItem,
                  ]}
                  onPress={() => {
                    onSelectCategory(cat);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedCategory === cat && styles.selectedDropdownItemText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  categoryDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 8,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedDropdownItem: {
    backgroundColor: "rgba(88, 164, 159, 0.1)",
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  selectedDropdownItemText: {
    color: Colors.light.tint,
    fontWeight: "700",
  },
});
