import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get("window");

export default function Notification({ navigation }) {
  const { isDarkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f4f4f4',
    },
    header: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      padding: 20,
      paddingTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#ddd',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
    },
    content: {
      padding: 20,
    },
    notificationList: {
      flex: 1,
    },
    notificationItem: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
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
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 5,
    },
    notificationTime: {
      fontSize: 12,
      color: isDarkMode ? '#ccc' : '#666',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
      marginTop: 20,
    },
    menu: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 20,
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#ddd',
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
      color: isDarkMode ? '#fff' : 'black',
      marginTop: 4,
    },
  });

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 80 }}>
        {notifications.length > 0 ? (
          <View style={styles.notificationList}>
            {notifications.map((notification, index) => (
              <View key={index} style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <MaterialCommunityIcons
                    name={getNotificationIcon(notification.logID).name}
                    size={30}
                    color={isDarkMode ? '#fff' : '#333'}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationMessage}>
                    {getNotificationMessage(notification.logID)}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {new Date(notification.updateTime).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>Không có thông báo nào</Text>
        )}
      </ScrollView>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name="home" size={24} color={isDarkMode ? '#fff' : 'gray'} />
          <Text style={styles.menuText}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Control')}>
          <FontAwesome5 name="sliders-h" size={24} color={isDarkMode ? '#fff' : 'gray'} />
          <Text style={styles.menuText}>Điều khiển</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="bell" size={24} color="blue" />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Setting')}>
          <FontAwesome5 name="cog" size={24} color={isDarkMode ? '#fff' : 'gray'} />
          <Text style={styles.menuText}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 