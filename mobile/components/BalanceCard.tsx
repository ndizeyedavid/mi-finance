import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Share,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

function formatRWF(amount: number): string {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface BalanceCardProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

export default function BalanceCard({
  totalBalance,
  income,
  expenses,
}: BalanceCardProps) {
  const colorScheme = useColorScheme();
  const [showBalance, setShowBalance] = useState(true);
  const [showActionsModal, setShowActionsModal] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(formatRWF(totalBalance));
    setShowActionsModal(false);
    Alert.alert("Copied!", "Balance copied to clipboard");
  };

  const shareBalance = async () => {
    try {
      await Share.share({
        message: `My total balance is ${formatRWF(totalBalance)}`,
      });
    } catch (error) {
      console.error(error);
    }
    setShowActionsModal(false);
  };

  const quickAddTransaction = () => {
    setShowActionsModal(false);
    router.push("/add-transaction?type=expense");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Total Balance</Text>
          <TouchableOpacity
            onPress={() => setShowBalance(!showBalance)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <FontAwesome
              name={showBalance ? "eye" : "eye-slash"}
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowActionsModal(true)}
          >
            <FontAwesome name="ellipsis-h" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={styles.balanceText}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {showBalance ? formatRWF(totalBalance) : "********"}
      </Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome name="arrow-down" size={14} color={"white"} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Income</Text>
            <Text
              style={styles.statAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {showBalance ? formatRWF(income) : "********"}
            </Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome name="arrow-up" size={14} color={"white"} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text
              style={styles.statAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {showBalance ? formatRWF(expenses) : "********"}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions Modal */}
      <Modal
        visible={showActionsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowActionsModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActionsModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Quick Actions</Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={copyToClipboard}
            >
              <FontAwesome
                name="copy"
                size={20}
                color={Colors.light.tint}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Copy Balance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={shareBalance}
            >
              <FontAwesome
                name="share-alt"
                size={20}
                color={Colors.light.tint}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Share Balance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={quickAddTransaction}
            >
              <FontAwesome
                name="plus-circle"
                size={20}
                color={Colors.light.tint}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Add Transaction</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setShowActionsModal(false);
                Alert.alert("Export Data", "Export feature coming soon!");
              }}
            >
              <FontAwesome
                name="download"
                size={20}
                color={Colors.light.tint}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Export Data</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 24,
    padding: 24,
    width: width - 48,
    marginBottom: 10,
    position: "absolute",
    top: 150,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 100,
    boxShadow: "0 5px 14px rgba(27, 92, 88, 0.7)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moreButton: {
    padding: 4,
  },
  balanceText: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  statTextContainer: {
    flex: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 2,
  },
  statAmount: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },
  modalHandle: {
    width: 48,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  actionIcon: {
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});
