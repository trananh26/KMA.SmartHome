import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get("window");

export default function Control({ navigation }) {
  const { isDarkMode } = useTheme();
  const [devices, setDevices] = useState({
    door: false,
    fan: false,
    lamp: false,
    alarm: false
  });
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
    deviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    deviceCard: {
      width: (width - 60) / 2,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    deviceName: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 10,
      color: isDarkMode ? '#fff' : '#333',
    },
    deviceStatus: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
      marginTop: 5,
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
    fetchDeviceState();
    const interval = setInterval(fetchDeviceState, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDeviceState = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/Sensor/GetEqiupmentState`);
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      const json = await response.json();
      
      if (json.code === "200" && json.data) {
        // Cập nhật trạng thái của tất cả các thiết bị
        const newDevices = {
          door: parseInt(json.data.door) === 1,
          fan: parseInt(json.data.fan) === 1,
          lamp: parseInt(json.data.lamp) === 1,
          alarm: parseInt(json.data.alarm) === 1
        };
        
        // Cập nhật state với trạng thái mới
        setDevices(newDevices);
      } else {
        throw new Error(json.message || 'Không có dữ liệu');
      }
    } catch (error) {
      console.error("Error fetching device state:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDevice = async (device) => {
    try {
      const newState = !devices[device];
      console.log(`Toggling ${device} to ${newState ? 1 : 0}`);
      
      const response = await fetch(`${API_URL}/Sensor/Control`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          equipmentID: device,
          equipmentState: newState ? 1 : 0
        })
      });
      
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }

      const json = await response.json();
      console.log("Control API Response:", json);
      
      if (json.code === "200") {
        // Sau khi điều khiển thành công, gọi lại API để lấy trạng thái mới nhất
        const stateResponse = await fetch(`${API_URL}/Sensor/GetEqiupmentState`);
        if (!stateResponse.ok) {
          throw new Error('Không thể lấy trạng thái thiết bị');
        }
        const stateJson = await stateResponse.json();
        console.log("Updated state from API:", stateJson);
        
        if (stateJson.code === "200" && stateJson.data) {
          const updatedDevices = {
            door: parseInt(stateJson.data.door) === 1,
            fan: parseInt(stateJson.data.fan) === 1,
            lamp: parseInt(stateJson.data.lamp) === 1,
            alarm: parseInt(stateJson.data.alarm) === 1
          };
          console.log("Updated device states:", updatedDevices);
          setDevices(updatedDevices);
        } else {
          throw new Error(stateJson.message || 'Không thể lấy trạng thái thiết bị');
        }
      } else {
        throw new Error(json.message || 'Không thể điều khiển thiết bị');
      }
    } catch (error) {
      console.error("Error toggling device:", error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchDeviceState} 
        />
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
            <FontAwesome5 name="newspaper" size={24} color="gray" />
            <Text style={styles.menuText}>Tổng quan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="chart-bar" size={24} color="blue" />
            <Text style={styles.menuText}>Điều khiển</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
            <FontAwesome5 name="bell" size={24} color="gray" />
            <Text style={styles.menuText}>Thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Điều khiển thiết bị</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.deviceGrid}>
          <TouchableOpacity 
            style={styles.deviceCard}
            onPress={() => toggleDevice('door')}
          >
            <FontAwesome5 
              name="door-open" 
              size={30} 
              color={devices.door ? '#28a745' : (isDarkMode ? '#fff' : '#333')} 
            />
            <Text style={styles.deviceName}>Cửa</Text>
            <Text style={styles.deviceStatus}>
              {devices.door ? 'Đang mở' : 'Đang đóng'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deviceCard}
            onPress={() => toggleDevice('fan')}
          >
            <FontAwesome5 
              name="fan" 
              size={30} 
              color={devices.fan ? '#28a745' : (isDarkMode ? '#fff' : '#333')} 
            />
            <Text style={styles.deviceName}>Quạt</Text>
            <Text style={styles.deviceStatus}>
              {devices.fan ? 'Đang bật' : 'Đang tắt'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deviceCard}
            onPress={() => toggleDevice('lamp')}
          >
            <FontAwesome5 
              name="lightbulb" 
              size={30} 
              color={devices.lamp ? '#28a745' : (isDarkMode ? '#fff' : '#333')} 
            />
            <Text style={styles.deviceName}>Đèn</Text>
            <Text style={styles.deviceStatus}>
              {devices.lamp ? 'Đang bật' : 'Đang tắt'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deviceCard}
            onPress={() => toggleDevice('alarm')}
          >
            <FontAwesome5 
              name="bell" 
              size={30} 
              color={devices.alarm ? '#28a745' : (isDarkMode ? '#fff' : '#333')} 
            />
            <Text style={styles.deviceName}>Báo động</Text>
            <Text style={styles.deviceStatus}>
              {devices.alarm ? 'Đang bật' : 'Đang tắt'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name="home" size={24} color={isDarkMode ? '#fff' : 'gray'} />
          <Text style={styles.menuText}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="sliders-h" size={24} color="blue" />
          <Text style={styles.menuText}>Điều khiển</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notification')}>
          <FontAwesome5 name="bell" size={24} color={isDarkMode ? '#fff' : 'gray'} />
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