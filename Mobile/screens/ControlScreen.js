import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Switch } from "react-native";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";
import ErrorMessage from "../components/ErrorMessage";

const { width } = Dimensions.get("window");

export default function Control({ navigation }) {
  const [devices, setDevices] = useState({
    door: false,
    fan: false,
    lamp: false,
    alarm: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const DeviceControl = ({ title, icon, device, color }) => (
    <View style={styles.deviceContainer}>
      <View style={styles.deviceInfo}>
        <MaterialCommunityIcons 
          name={icon} 
          size={30} 
          color={color} 
        />
        <Text style={styles.deviceTitle}>{title}</Text>
      </View>
      <Switch
        value={devices[device]}
        onValueChange={() => toggleDevice(device)}
        trackColor={{ false: "#767577", true: color }}
        thumbColor={devices[device] ? "#fff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={[styles.header, { paddingTop: 20 }]}>Điều khiển thiết bị</Text>

        <View style={styles.section}>
          <DeviceControl
            title="Cửa"
            icon={devices.door ? "door-open" : "door-closed"}
            device="door"
            color="#28a745"
          />
          <DeviceControl
            title="Quạt"
            icon="fan"
            device="fan"
            color="#17a2b8"
          />
          <DeviceControl
            title="Đèn"
            icon={devices.lamp ? "lightbulb-on" : "lightbulb-off"}
            device="lamp"
            color="#ffc107"
          />
          <DeviceControl
            title="Còi"
            icon="alarm"
            device="alarm"
            color="#dc3545"
          />
        </View>
      </ScrollView>

      {/* Menu */}
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
  deviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  deviceTitle: {
    fontSize: 18,
    marginLeft: 15,
    color: "#343a40",
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