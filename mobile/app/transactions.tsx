import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import TransactionItem from "@/components/TransactionItem";
import { mockTransactions } from "./(tabs)";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

type FilterType = "all" | "income" | "expense";

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const groupedAndFilteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          tx.name.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query),
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === activeFilter);
    }

    const grouped = filtered.reduce(
      (acc, tx) => {
        if (!acc[tx.dateGroup]) {
          acc[tx.dateGroup] = [];
        }
        acc[tx.dateGroup].push(tx);
        return acc;
      },
      {} as Record<string, typeof mockTransactions>,
    );

    return grouped;
  }, [searchQuery, activeFilter]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
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
              <Text style={styles.headerTitle}>Transaction History</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.searchContainer}>
              <FontAwesome
                name="search"
                size={16}
                color="#888"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  style={styles.clearButton}
                >
                  <FontAwesome name="times-circle" size={18} color="#888" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === "all" && styles.activeFilterButton,
                ]}
                onPress={() => setActiveFilter("all")}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === "all" && styles.activeFilterText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === "income" && styles.activeFilterButton,
                ]}
                onPress={() => setActiveFilter("income")}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === "income" && styles.activeFilterText,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === "expense" && styles.activeFilterButton,
                ]}
                onPress={() => setActiveFilter("expense")}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === "expense" && styles.activeFilterText,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.transactionsScroll}
              showsVerticalScrollIndicator={false}
            >
              {Object.keys(groupedAndFilteredTransactions).length > 0 ? (
                Object.entries(groupedAndFilteredTransactions).map(
                  ([dateGroup, transactions]) => (
                    <View key={dateGroup} style={styles.dateGroup}>
                      <Text style={styles.dateHeader}>{dateGroup}</Text>
                      <View style={styles.transactionsList}>
                        {transactions.map((tx) => (
                          <TransactionItem key={tx.id} {...tx} />
                        ))}
                      </View>
                    </View>
                  ),
                )
              ) : (
                <View style={styles.emptyState}>
                  <FontAwesome
                    name="inbox"
                    size={64}
                    color="rgba(150,150,150,0.4)"
                  />
                  <Text style={styles.emptyTitle}>No transactions found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        <StatusBar style="light" />
      </CustomSafeAreaView>
    </>
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
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    marginBottom: 24,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    padding: 4,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    position: "relative",
    top: -40,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeFilterButton: {
    backgroundColor: Colors.light.tint,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  activeFilterText: {
    color: "white",
  },
  transactionsScroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888",
    marginBottom: 12,
    marginLeft: 8,
  },
  transactionsList: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#888",
    marginTop: 20,
  },
});
