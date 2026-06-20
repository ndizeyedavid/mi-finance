import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "@/components/TransactionItem";
import SendAgainAvatar from "@/components/SendAgainAvatar";

const mockTransactions = [
  {
    id: "1",
    name: "Upwork",
    date: "Today",
    amount: 850000,
    type: "income" as const,
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Upwork_logo.svg/1200px-Upwork_logo.svg.png",
  },
  {
    id: "2",
    name: "Transfer",
    date: "Yesterday",
    amount: 85000,
    type: "expense" as const,
    iconUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Paypal",
    date: "Jan 30, 2022",
    amount: 1406000,
    type: "income" as const,
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1000px-PayPal.svg.png",
  },
  {
    id: "4",
    name: "Youtube",
    date: "Jan 16, 2022",
    amount: 11990,
    type: "expense" as const,
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png",
  },
];

const mockSendAgain = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1485206412256-70125b947694?w=100&h=100&fit=crop&crop=face",
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon,</Text>
            <Text style={styles.userName}>Enjelin Morgeana</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <FontAwesome name="bell" size={20} color="white" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <BalanceCard
          totalBalance={2548000}
          income={1840000}
          expenses={284000}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions History</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {mockTransactions.map((tx) => (
            <TransactionItem key={tx.id} {...tx} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Send Again</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          style={styles.sendAgainContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sendAgainContent}
        >
          {mockSendAgain.map((url, index) => (
            <SendAgainAvatar key={index} imageUrl={url} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.danger,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  seeAllButton: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  transactionsContainer: {
    gap: 8,
  },
  sendAgainContainer: {
    marginBottom: 100,
  },
  sendAgainContent: {
    gap: 16,
    paddingRight: 24,
  },
});
