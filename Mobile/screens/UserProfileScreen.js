import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";

const { width } = Dimensions.get("window");

export default function UserProfile({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/User/GetUserInfo`);
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      const json = await response.json();
      
      if (json.code === "200" && json.data) {
        setUserInfo(json.data);
      } else {
        throw new Error(json.message || 'Không có dữ liệu');
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/User/UpdateUserInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
      });
      
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      
      const json = await response.json();
      if (json.code === "200") {
        Alert.alert("Thành công", "Cập nhật thông tin thành công");
      } else {
        throw new Error(json.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchUserInfo} 
        />
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
            <FontAwesome5 name="newspaper" size={24} color="gray" />
            <Text style={styles.menuText}>Tổng quan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Control")}>
            <FontAwesome5 name="chart-bar" size={24} color="gray" />
            <Text style={styles.menuText}>Điều khiển</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
            <FontAwesome5 name="bell" size={24} color="gray" />
            <Text style={styles.menuText}>Thông báo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Setting")}>
            <FontAwesome5 name="cog" size={24} color="blue" />
            <Text style={styles.menuText}>Cài đặt</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={[styles.header, { paddingTop: 20 }]}>Thông tin tài khoản</Text>

        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <TextInput
              style={styles.input}
              value={userInfo.username}
              onChangeText={(text) => setUserInfo({...userInfo, username: text})}
              placeholder="Nhập tên đăng nhập"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={styles.input}
              value={userInfo.fullName}
              onChangeText={(text) => setUserInfo({...userInfo, fullName: text})}
              placeholder="Nhập họ và tên"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({...userInfo, email: text})}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity 
            style={styles.updateButton}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.updateButtonText}>
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color="gray" />
          <Text style={styles.menuText}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Control")}>
          <FontAwesome5 name="chart-bar" size={24} color="gray" />
          <Text style={styles.menuText}>Điều khiển</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
          <FontAwesome5 name="bell" size={24} color="gray" />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Setting")}>
          <FontAwesome5 name="cog" size={24} color="blue" />
          <Text style={styles.menuText}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#343a40",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
    color: "black",
    marginTop: 4,
  },
}); 