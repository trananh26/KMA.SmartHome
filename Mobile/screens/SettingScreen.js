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
    sections: {
      padding: 20,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      borderRadius: 10,
      marginBottom: 10,
    },
    settingText: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#333',
      marginLeft: 10,
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#ddd',
      width: width,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 10,
    },
    menuItem: {
      alignItems: 'center',
      flex: 1,
    },
    menuText: {
      fontSize: 12,
      color: isDarkMode ? '#fff' : 'black',
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cài đặt</Text>
      </View>

      <ScrollView style={styles.sections} contentContainerStyle={{ paddingBottom: 80 }}>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <FontAwesome5 name="user" size={20} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={styles.settingText}>Thông tin tài khoản</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <FontAwesome5 name="key" size={20} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={styles.settingText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={toggleTheme}
        >
          <FontAwesome5 name={isDarkMode ? 'sun' : 'moon'} size={20} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={styles.settingText}>Chế độ {isDarkMode ? 'sáng' : 'tối'}</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleLogout}
        >
          <Text style={[styles.settingText, { color: "#dc3545" }]}>Đăng xuất</Text>
          <FontAwesome5 name="sign-out-alt" size={16} color="#dc3545" />
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notification')}>
          <FontAwesome5 name="bell" size={24} color={isDarkMode ? '#fff' : 'gray'} />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="cog" size={24} color="blue" />
          <Text style={styles.menuText}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 