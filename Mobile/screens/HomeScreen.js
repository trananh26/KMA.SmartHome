import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/api";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [data, setData] = useState({
    afterORP: 0,
    afterPh: 0,
    afterTDS: 0,
    afterTurbidity: 0,
    collectedElectricity: 0,
    hum: 0,
    pM25: 0,
    poweConsumption: 0,
    prevORP: 0,
    prevPh: 0,
    prevTDS: 0,
    prevTurbidity: 0,
    temp: 0,
    tvoc: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/Sensor/GetCurrentSensorData`);
        const json = await response.json();
        if (json.code === "200" && json.data.length > 0) {
          setData(json.data[0]);
        } else {
          console.error("Error fetching data:", json.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
      <Text style={styles.title}></Text>
        <Text style={styles.header}>SLT Green Hub Environment</Text>

        {/* Water Quality Before Treatment */}
        <Text style={styles.title}>Water Quality On Treatment</Text>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="ph" size={30} color="#007bff" />
            <Text style={styles.title}>pH</Text>
            <Text style={styles.value}>T: {data.prevPh}</Text>
            <Text style={styles.value}>S: {data.afterPh}</Text>
          </View>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="chemical-weapon" size={30} color="#007bff" />
            <Text style={styles.title}>ORP</Text>
            <Text style={styles.value}>T: {data.prevORP}</Text>
            <Text style={styles.value}>S: {data.afterORP}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="water" size={30} color="#007bff" />
            <Text style={styles.title}>TDS</Text>
            <Text style={styles.value}>T: {data.prevTDS}</Text>
            <Text style={styles.value}>S: {data.afterTDS}</Text>
          </View>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="water-opacity" size={30} color="#007bff" />
            <Text style={styles.title}>Turbidity</Text>
            <Text style={styles.value}>T: {data.prevTurbidity}</Text>
            <Text style={styles.value}>S: {data.afterTurbidity}</Text>
          </View>
        </View>

        {/* Air Quality */}
        <Text style={styles.title}>Air Quality</Text>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="thermometer" size={30} color="#dc3545" />
            <Text style={styles.title}>Temp</Text>
            <Text style={styles.value}>{data.temp}°C</Text>
          </View>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="water" size={30} color="#17a2b8" />
            <Text style={styles.title}>Hum</Text>
            <Text style={styles.value}>{data.hum}%</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="smog" size={30} color="#6c757d" />
            <Text style={styles.title}>PM2.5</Text>
            <Text style={styles.value}>{data.pM25}</Text>
          </View>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="molecule" size={30} color="#343a40" />
            <Text style={styles.title}>TVOC</Text>
            <Text style={styles.value}>{data.tvoc}</Text>
          </View>
        </View>

        {/* Energy Conversion */}
        <Text style={styles.title}>Energy Conversion</Text>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="solar-power" size={30} color="#ffc107" />
            <Text style={styles.title}>Collected</Text>
            <Text style={styles.value}>{data.collectedElectricity} kWh</Text>
          </View>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="power-plug" size={30} color="#fd7e14" />
            <Text style={styles.title}>Consumption</Text>
            <Text style={styles.value}>{data.poweConsumption} kWh</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.card, styles.cardLarge]}>
            <MaterialCommunityIcons name="gauge" size={30} color="#007bff" />
            <Text style={styles.title}>Load Capacity</Text>
            <Text style={styles.value}>{data.loadCapacity}W</Text>
          </View>
        </View>
      </ScrollView>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="newspaper" size={24} color="blue" />
          <Text style={styles.menuText}>Môi trường</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Sale")}>
          <FontAwesome5 name="chart-bar" size={24} color="gray" />
          <Text style={styles.menuText}>Bán hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("WareHouse")}>
          <FontAwesome5 name="warehouse" size={24} color="gray" />
          <Text style={styles.menuText}>Kho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Employee")}>
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
  card: {
    backgroundColor: "#fff",
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
  },
  value: {
    fontSize: 16,
    color: "gray",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
