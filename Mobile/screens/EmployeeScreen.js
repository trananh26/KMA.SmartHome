import React from "react";
import {  View,  Text,  TextInput,  FlatList,  Image,  ScrollView,  TouchableOpacity,  StyleSheet,  Dimensions} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
const Stack = createStackNavigator();

// Dữ liệu danh bạ giả lập
const contacts = [
  {
    id: "1",
    name: "Đỗ Diệu Linh",
    position: "NV bán hàng",
    department: "Nhà hàng A2",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Nguyễn Thị Ngân",
    position: "NV bán hàng",
    department: "Nhà hàng A2",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Võ Thị Nhung",
    position: "NV hỗ trợ",
    department: "Nhà hàng A2",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "4",
    name: "Trần Ngọc Huyền",
    position: "NV kiểm soát chất lượng",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Nguyễn Thanh An",
    position: "NV kinh doanh",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "6",
    name: "Nguyễn Đại Ngọc",
    position: "NV kinh doanh",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "7",
    name: "Nguyễn Trung Quân",
    position: "NV kinh doanh",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "8",
    name: "Nguyễn Ngọc Ấn",
    position: "NV kinh doanh",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "9",
    name: "Nguyễn Đình Long",
    position: "Quản lý kinh doanh",
    department: "Phòng kinh doanh",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "10",
    name: "Nguyễn Đình Tùng",
    position: "Quản lý địa bàn",
    department: "Nhà hàng A2",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export default function Employee({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.header}></Text>

        <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Danh bạ</Text>
      <Text style={styles.subtitle}>Nhà hàng SLT Green Hub</Text>

      {/* Ô tìm kiếm */}
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo Họ tên/SĐT/Email/Đơn vị..."
        />
      </View>

      {/* Danh sách danh bạ */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPosition}>{item.position}</Text>
              <Text style={styles.contactDepartment}>{item.department}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="phone" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color="gray" />
          <Text style={styles.menuText}>Môi trường</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Sale")}>
          <FontAwesome5 name="chart-bar" size={24} color="gray" />
          <Text style={styles.menuText}>Bán hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("WareHouse")}>
          <FontAwesome5 name="warehouse" size={24} color="gray" />
          <Text style={styles.menuText}>Kho</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Employee")}>
          <FontAwesome5 name="user-friends" size={24} color="blue" />
          <Text style={styles.menuText}>Nhân viên</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="bell" size={24} color="gray" />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity >
      </View>
    </View>
  );
};


// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPosition: {
    fontSize: 14,
    color: "gray",
  },
  contactDepartment: {
    fontSize: 12,
    color: "gray",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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