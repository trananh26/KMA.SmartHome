import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";

const { width } = Dimensions.get("window");

export default function Notification({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/Sensor/GetAlertHistory`);
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      const json = await response.json();
      if (json.code === "200" && json.data) {
        setNotifications(json.data);
      } else {
        throw new Error(json.message || 'Không có dữ liệu');
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (logID) => {
    switch (logID) {
      case "1":
        return { name: "door-closed", color: "#dc3545" };
      case "2":
        return { name: "gas-cylinder", color: "#ffc107" };
      case "3":
        return { name: "thermometer", color: "#dc3545" };
      case "4":
        return { name: "water", color: "#17a2b8" };
      case "6":
        return { name: "alarm", color: "#28a745" };
      default:
        return { name: "alert", color: "#6c757d" };
    }
  };

  const getNotificationMessage = (logID) => {
    switch (logID) {
      case "1":
        return "Cảnh báo: Mật khẩu mở cửa không đúng";
      case "2":
        return "Cảnh báo: Phát hiện khí gas vượt ngưỡng";
      case "3":
        return "Cảnh báo: Nhiệt độ vượt ngưỡng";
      case "4":
        return "Cảnh báo: Độ ẩm vượt ngưỡng";
      case "6":
        return "Thông báo: Đã tắt còi báo động";
      default:
        return "Thông báo hệ thống";
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchNotifications} 
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

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="bell" size={24} color="blue" />
            <Text style={styles.menuText}>Thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={[styles.header, { paddingTop: 20 }]}>Thông báo</Text>

        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có thông báo nào</Text>
          </View>
        ) : (
          <View style={styles.notificationList}>
            {notifications.map((notification, index) => {
              const icon = getNotificationIcon(notification.logID);
              console.log("notification:", notification);
              return (
                <View key={index} style={styles.notificationItem}>
                  <MaterialCommunityIcons 
                    name={icon.name} 
                    size={30} 
                    color={icon.color} 
                    style={styles.notificationIcon}
                  />
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationMessage}>
                      {getNotificationMessage(notification.logID)}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {new Date(notification.updateTime).toLocaleString()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
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

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="bell" size={24} color="blue" />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Setting")}>
          <FontAwesome5 name="cog" size={24} color="gray" />
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
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  notificationList: {
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#343a40",
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "#6c757d",
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