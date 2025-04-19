import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Switch } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function Setting({ navigation }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const handleLogout = () => {
    // Xử lý đăng xuất
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={[styles.header, { paddingTop: 20, color: colors.text }]}>Cài đặt</Text>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Text style={[styles.settingText, { color: colors.text }]}>Thông tin tài khoản</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={[styles.settingText, { color: colors.text }]}>Thay đổi mật khẩu</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.secondary} />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text }]}>Chế độ tối</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#4a90e2" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text }]}>Ngôn ngữ</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text }]}>Thông báo</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleLogout}
          >
            <Text style={[styles.settingText, { color: "#dc3545" }]}>Đăng xuất</Text>
            <FontAwesome5 name="sign-out-alt" size={16} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={[styles.menu, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color="gray" />
          <Text style={[styles.menuText, { color: colors.text }]}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Control")}>
          <FontAwesome5 name="chart-bar" size={24} color="gray" />
          <Text style={[styles.menuText, { color: colors.text }]}>Điều khiển</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
          <FontAwesome5 name="bell" size={24} color="gray" />
          <Text style={[styles.menuText, { color: colors.text }]}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="cog" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.primary }]}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 16,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    width: width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  menuItem: {
    alignItems: "center",
    flex: 1,
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 