import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomAlert from "../components/CustomAlert";
import { API_URL } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setAlertMessage("Vui lòng nhập tài khoản và mật khẩu");
      setAlertVisible(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/User/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();
      if (json.code === "200") {
        // Lưu thông tin người dùng vào AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(json.data));
        // Chuyển sang màn hình Home và truyền thông tin người dùng
        navigation.navigate("Home", { userInfo: json.data });
      } else {
        setAlertMessage(json.message || "Đăng nhập thất bại");
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Không thể kết nối đến máy chủ");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Text style={styles.title}></Text>
      <TextInput
        style={styles.input}
        placeholder="   Tài khoản"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Mật khẩu"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <MaterialCommunityIcons
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f5f5f5", 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#2c6e49", 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    marginBottom: 20 
  },
  input: { 
    width: "100%", 
    padding: 15, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    backgroundColor: "white", 
    marginBottom: 15 
  },
  passwordContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    backgroundColor: "white", 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  inputPassword: { 
    flex: 1, 
    padding: 15 
  },
  loginButton: { 
    backgroundColor: "#2c6e49", 
    padding: 15, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center" 
  },
  disabledButton: {
    backgroundColor: "#ccc"
  },
  loginText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  registerText: {
    marginTop: 15,
    color: "#007bff",
    fontSize: 14,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -40
  },
});
