import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get("window");

export default function Home({ navigation, route }) {
  const { colors } = useTheme();
  const [data, setData] = useState({
    temp: 0,
    hum: 0,
    gas: 0,
    net1: 0,
    net2: 0,
    updateTime: new Date()
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);
  const [hasNewNotification, setHasNewNotification] = useState(false); // State for new notification

  // Function to check for new alarms
  const checkNewAlarms = async () => {
    try {
      const response = await fetch(`${API_URL}/Sensor/GetNewAlarm`);
      if (!response.ok) {
        // Don't throw an error here, just log it, as this is a background check
        console.log('Failed to check for new alarms: Network error');
        return;
      }
      const json = await response.json();
      if (json.code === "200" ) {
        setHasNewNotification(true);
      } else {
        setHasNewNotification(false); // Clear badge on press
      }
    } catch (error) {
      console.log("Error checking new alarms:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    // Cập nhật thời gian mỗi giây
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Lấy thông tin người dùng từ route params hoặc AsyncStorage
    if (route.params?.userInfo) {
      setUserInfo(route.params.userInfo);
    } else {
      loadUserInfo();
    }

    // Initial check and start polling for alarms
    checkNewAlarms();
    const alarmInterval = setInterval(checkNewAlarms, 10000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
      clearInterval(alarmInterval); // Clear alarm interval on unmount
    };
  }, [route.params]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/Sensor/GetEnvironmentData`);
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      const json = await response.json();
      if (json.code === "200" && json.data.length > 0) {
        setData(json.data[0]);
      } else {
        throw new Error(json.message || 'Không có dữ liệu');
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchData} 
        />
        <View style={[styles.menu, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="newspaper" size={24} color={colors.primary} />
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
        </View>
      </View>
    );
  }

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleDateString('vi-VN', options);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}      
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Xin chào, {userInfo?.fullName || 'Người dùng'}
            </Text>
            <Text style={[styles.dateTime, { color: colors.secondary }]}>{formatDate(currentTime)}</Text>
          </View>
          <View style={styles.headerIcons}>
             {/* Header Notification Icon with Badge */}
             <TouchableOpacity 
               style={[styles.iconButton, { backgroundColor: colors.card }]} 
               onPress={() => {
                 setHasNewNotification(false); // Clear badge on press
                 navigation.navigate("Notification", { userInfo: userInfo });
               }}
             >
               <View>
                 <Ionicons name="notifications-outline" size={24} color={colors.text} />
                 {hasNewNotification && <View style={styles.notificationBadge} />}
               </View>
             </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: colors.card }]} 
              onPress={() => navigation.navigate("Setting", { userInfo: userInfo })}
            >
              <Ionicons name="settings-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={[styles.title, { color: colors.text }]}>Môi trường</Text>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="thermometer" size={30} color="#dc3545" />
            <Text style={[styles.title, { color: colors.text }]}>Nhiệt độ</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{data.temp}°C</Text>
          </View>
          <View style={[styles.card, styles.cardLarge, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="water" size={30} color="#17a2b8" />
            <Text style={[styles.title, { color: colors.text }]}>Độ ẩm</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{data.hum}%</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, { width: width - 40, backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="gas-cylinder" size={30} color="#ffc107" />
            <Text style={[styles.title, { color: colors.text }]}>Khí gas</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{data.gas}</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Trạng thái mạng</Text>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="wifi" size={30} color={data.net1 === 1 ? "#28a745" : "#dc3545"} />
            <Text style={[styles.title, { color: colors.text }]}>Lưu lượng mạng</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{data.net1}</Text>
          </View>
          <View style={[styles.card, styles.cardLarge, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="wifi" size={30} color={data.net2 === 1 ? "#28a745" : "#dc3545"} />
            <Text style={[styles.title, { color: colors.text }]}>Lưu lượng tổng</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{data.net2}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, { width: width - 40, backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="clock" size={30} color="#6c757d" />
            <Text style={[styles.title, { color: colors.text }]}>Cập nhật lần cuối</Text>
            <Text style={[styles.value, { color: colors.secondary }]}>{new Date(data.updateTime).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={[styles.menu, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="newspaper" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Tổng quan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Control")}>
          <FontAwesome5 name="chart-bar" size={24} color={colors.secondary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Điều khiển</Text>
        </TouchableOpacity>

        {/* Menu Notification Icon with Badge */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => {
            setHasNewNotification(false); // Clear badge on press
            navigation.navigate("Notification", { userInfo: userInfo });
          }}
        >
          <View>
            <FontAwesome5 name="bell" size={24} color={colors.secondary} />
            {hasNewNotification && <View style={styles.notificationBadge} />}
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate("Setting", { userInfo: userInfo })}
        >
          <FontAwesome5 name="cog" size={24} color={colors.secondary} />
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
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateTime: {
    fontSize: 14,
    marginTop: 5,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
    padding: 8,
    borderRadius: 20,
  },
  scrollView: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    textAlign: "center",
  },
  cardSmall: {
    width: (width - 60) / 3,
  },
  cardLarge: {
    width: (width - 50) / 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },
  value: {
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notificationBadge: { // Style for the red dot
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 5,
    width: 10,
    height: 10,
    zIndex: 10,
  },
});
