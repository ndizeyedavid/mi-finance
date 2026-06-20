import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import ProfileSection from "@/components/ProfileSection";
import ProfileItem from "@/components/ProfileItem";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [passcodeEnabled, setPasscodeEnabled] = useState(false);

  return (
    <CustomSafeAreaView edges={["bottom", "left", "right"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <FontAwesome name="user" size={40} color="white" />
            </View>
            <Text style={styles.userName}>David Ndizeye</Text>
            <Text style={styles.userEmail}>david@example.com</Text>
            <Link href="/profile/edit" asChild>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Security Section */}
          <ProfileSection title="Preference">
            <ProfileItem
              icon="money"
              label="Currency"
              value="RWF"
              showArrow={false}
            />
          </ProfileSection>
          <ProfileSection title="Security">
            <View style={styles.switchItemContainer}>
              <ProfileItem
                icon="camera-retro"
                label="Face ID"
                showArrow={false}
              />
              <View style={styles.switchWrapper}>
                <Switch
                  value={faceIdEnabled}
                  onValueChange={setFaceIdEnabled}
                  trackColor={{ false: "#ddd", true: Colors.light.tint }}
                  thumbColor="white"
                />
              </View>
            </View>
            <Link href="/profile/passcode" asChild>
              <ProfileItem icon="lock" label="Passcode" />
            </Link>
          </ProfileSection>

          {/* Data Section */}
          <ProfileSection title="Data">
            <ProfileItem icon="download" label="Export Data" />
            <ProfileItem icon="refresh" label="Reset All Data" danger />
          </ProfileSection>

          <ProfileSection title="Access">
            <ProfileItem icon="lock" label="Lock App" danger />
            <ProfileItem icon="sign-out" label="Logout" danger />
          </ProfileSection>

          {/* About Section */}
          <ProfileSection title="About">
            <ProfileItem
              icon="info-circle"
              label="Version"
              value="1.0.0"
              showArrow={false}
            />
          </ProfileSection>
        </View>
      </ScrollView>
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
    paddingTop: 70,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 24,
    position: "relative",
    top: -60,
  },
  userCard: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: "#888",
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(88, 164, 159, 0.1)",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.tint,
  },
  switchItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 80,
  },
  switchWrapper: {
    flex: 1,
    paddingVertical: 16,
  },
});
