import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const Stack = createStackNavigator();
const data = {
  labels: [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", " 10", " 11", " 12"],
  datasets: [
    {
      data: [232.29, 250.26, 91.37, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Dữ liệu từ báo cáo doanh số
    }
  ]
};

export default function Sale({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.title}></Text>

        <Text style={styles.title}>Báo cáo</Text>
        <Text style={styles.subtitle}>Doanh thu bán hàng</Text>

        <View style={styles.yearContainer}>
          <Text style={styles.year}>2023</Text>
          <Text style={styles.year}>2024</Text>
          <Text style={[styles.year, styles.activeYear]}>2025</Text>
        </View>

        <Text style={styles.totalRevenue}>Tổng doanh số</Text>
        <Text style={styles.amount}>473,92 triệu</Text>

        <BarChart
          data={data}
          width={Dimensions.get("window").width - 40}
          height={400}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            barPercentage: 0.5
          }}
          verticalLabelRotation={0}
          style={styles.chart}
        />

        <Text style={styles.header}>Doanh thu trong tuần</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [10, 50, 30, 80, 20, 60], // Dữ liệu hiển thị trên đường biểu đồ
                strokeWidth: 2, // Độ dày đường
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // Chiều rộng (tự động fit màn hình)
          height={220} // Chiều cao
          yAxisLabel="" // Tiền tố đơn vị (ví dụ: "$")
          yAxisSuffix="" // Hậu tố đơn vị
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1, // Số chữ số sau dấu phẩy
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu đường biểu đồ
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 10 },
            propsForDots: {
              r: "5", // Bán kính điểm tròn
              strokeWidth: "2",
              stroke: "#ffa726", // Màu viền điểm
            },
          }}
          bezier // Làm mượt đường biểu đồ
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />

      </ScrollView>
      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color="gray" />
          <Text style={styles.menuText}>Môi trường</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Sale")}>
          <FontAwesome5 name="chart-bar" size={24} color="blue" />
          <Text style={styles.menuText}>Bán hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("WareHouse")}>
          <FontAwesome5 name="warehouse" size={24} color="gray" />
          <Text style={styles.menuText}>Kho</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Employee")}>
          <FontAwesome5 name="user-friends" size={24} color="gray" />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 16,
    color: "gray"
  },
  company: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10
  },
  yearContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  year: {
    fontSize: 16,
    color: "gray"
  },
  activeYear: {
    color: "blue",
    fontWeight: "bold"
  },
  totalRevenue: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "black"
  },
  chart: {
    marginVertical: 10
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    color: "gray"
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
  }
});