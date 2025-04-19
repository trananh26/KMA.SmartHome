import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

export default function UserProfile({ navigation, route }) {
  const { colors } = useTheme();
  const [userInfo, setUserInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      if (userData) {
        const parsedData = JSON.parse(userData);
        // Kiểm tra nếu dữ liệu là mảng
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setUserInfo(parsedData[0]);
        } else if (parsedData && typeof parsedData === 'object') {
          setUserInfo(parsedData);
        }
      }
    } catch (error) {
      console.error('Error loading user info:', error);
      setError('Không thể tải thông tin người dùng');
    }
  };

  const handleUpdate = async () => {
    if (!userInfo.fullName || !userInfo.email || !userInfo.phoneNumber) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/User/UpdateUserInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: userInfo.fullName,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber
        }),
      });

      const json = await response.json();
      if (json.code === "200") {
        Alert.alert("Thành công", "Cập nhật thông tin thành công", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        setError(json.message || "Cập nhật thông tin thất bại");
      }
    } catch (error) {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Thông tin tài khoản</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Tên đăng nhập</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor={colors.placeholder}
              value={userInfo.userName}
              onChangeText={(text) => setUserInfo({...userInfo, userName: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Họ và tên</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              placeholder="Nhập họ và tên"
              placeholderTextColor={colors.placeholder}
              value={userInfo.fullName}
              onChangeText={(text) => setUserInfo({...userInfo, fullName: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              placeholder="Nhập email"
              placeholderTextColor={colors.placeholder}
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({...userInfo, email: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Số điện thoại</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={colors.placeholder}
              value={userInfo.phoneNumber}
              onChangeText={(text) => setUserInfo({...userInfo, phoneNumber: text})}
            />
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

        
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={[styles.menu, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color={colors.secondary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Control")}>
          <FontAwesome5 name="chart-bar" size={24} color={colors.secondary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Điều khiển</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
          <FontAwesome5 name="bell" size={24} color={colors.secondary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Setting")}>
          <FontAwesome5 name="cog" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    padding: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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