import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { PieChart } from "react-native-chart-kit";
import { Title, Paragraph, DataTable } from "react-native-paper";

const { width } = Dimensions.get("window");
const Stack = createStackNavigator();

const WareHouse = ({ navigation }) => {
  const tableHead = ["Tên hàng", "Số lượng", "Loại hàng", "Ngày nhập"];
  const tableData = [
    ["Cam sành", "25", "Hoa quả", "10/03/2025"],
    ["Xoài", "30", "Hoa quả", "10/03/2025"],
    ["Táo", "28", "Hoa quả", "10/03/2025"],
    ["Ổi", "25", "Hoa quả", "10/03/2025"],
    ["Việt quất", "30", "Hoa quả", "10/03/2025"],
    ["Quế", "28", "Hoa quả", "10/03/2025"],
    ["Nhãn", "25", "Hoa quả", "10/03/2025"],
    ["Mít", "30", "Hoa quả", "10/03/2025"],
    ["Mãng cầu", "28", "Hoa quả", "10/03/2025"],
    ["Nho", "25", "Hoa quả", "10/03/2025"],
    ["Dâu tây", "30", "Hoa quả", "10/03/2025"],
    ["Xà bông", "28", "Xà phòng", "10/03/2025"],
    ["Dứa", "25", "Hoa quả", "10/03/2025"],
    ["Xoài", "30", "Hoa quả", "10/03/2025"],
    ["Táo", "28", "Hoa quả", "10/03/2025"],
    ["Cam sành", "25", "Hoa quả", "10/03/2025"],
    ["Xoài", "30", "Hoa quả", "10/03/2025"],
    ["Táo", "28", "Hoa quả", "10/03/2025"],
  ];
  const data = [
    {
      name: "Hoa quả",
      population: 40,
      color: "#9D2EC5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Xà phòng",
      population: 30,
      color: "#2EC540",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Dầu gội",
      population: 20,
      color: "#2E87C5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Khác",
      population: 10,
      color: "#C5792E",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80, padding: 8}}
      >
        <View contentContainerStyle={{ backgroundColor: "#FFFFFF", flex: 1, padding: 16 }}>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>Quản lý kho</Text>
        </View>

       <View style={styles.section}>
          <PieChart
            data={data}
            width={350}
            height={220}
            hasCenter={true}
            centerRadius={70}
            chartConfig={{
              backgroundColor: "#FFFFFF",
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 120, 22, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            useShadow
          />
        </View>
        <View style={styles.section}>

          <Title>Danh sách hàng hóa</Title>
          <DataTable>
            <DataTable.Header>
              {tableHead.map((head, index) => (
                <DataTable.Title key={index} style={styles.tableHeader}>
                  {head}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {tableData.map((rowData, index) => (
              <DataTable.Row key={index}>
                {rowData.map((cellData, cellIndex) => (
                  <DataTable.Cell key={cellIndex} style={styles.tableCell}>
                    {cellData}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome5 name="newspaper" size={24} color="gray" />
          <Text style={styles.menuText}>Môi trường</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Sale")}
        >
          <FontAwesome5 name="chart-bar" size={24} color="gray" />
          <Text style={styles.menuText}>Bán hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("WareHouse")}
        >
          <FontAwesome5 name="warehouse" size={24} color="blue" />
          <Text style={styles.menuText}>Kho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Employee")}
        >
          <FontAwesome5 name="user-friends" size={24} color="gray" />
          <Text style={styles.menuText}>Nhân viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="bell" size={24} color="gray" />
          <Text style={styles.menuText}>Thông báo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingVertical: 20,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  tableHeader: {
    justifyContent: "center",
    flex: 2,
  },
  tableCell: {
    justifyContent: "center",
    flex: 2,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
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

export default WareHouse;
