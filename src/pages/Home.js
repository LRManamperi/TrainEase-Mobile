import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import backgroundImage from "../assets/train.png";
import { formatDate } from "../utils/Utils";
import { BASE_URL } from "@env";  

export default function HomeScreen({ navigation }) {
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());  // Default to current date
  const [show, setShow] = useState(false);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get(`${BASE_URL}/api/search/stations`);
        setStations(response.data.map(station => ({ label: station.name })));
      } catch (error) {
        console.error("Error fetching stations:", error);  // Log the full error
        Alert.alert("Error", "Failed to fetch stations");
      }
    }
    fetchStations();
  }, []);  // Add an empty dependency array to fetch stations only once
  
  const onChange = (event, date) => {
    setShow(false);
    setSelectedDate(date || selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleSearch = () => {
    if (!selectedValue1 || !selectedValue2 || !selectedDate) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    navigation.navigate("Schedules", {
      searchParams: {
        from: selectedValue1,
        to: selectedValue2,
        date: formatDate(selectedDate),
      },
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={{ borderRadius: 15, overflow: "hidden" }}>
          <Picker
            selectedValue={selectedValue1}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedValue1(itemValue)}
          >
            <Picker.Item label="From" value="" />
            {stations.map((station, index) => (
              <Picker.Item key={index} label={station.label} value={station.label} />
            ))}
          </Picker>
        </View>
        <View style={{ borderRadius: 15, overflow: "hidden" }}>
          <Picker
            selectedValue={selectedValue2}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedValue2(itemValue)}
          >
            <Picker.Item label="To" value="" />
            {stations.map((station, index) => (
              <Picker.Item key={index} label={station.label} value={station.label} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.datePicker}>
            <Text style={styles.dateText}>
              {selectedDate ? formatDate(selectedDate) : "mm/dd/yyyy"}
            </Text>
            <FontAwesome name="calendar-o" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate || new Date()}
            minimumDate={new Date()}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  picker: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    marginBottom: 7,
    borderRadius: 15,
  },
  container: {
    marginTop: 40,
    marginHorizontal: "auto",
    width: "80%",
    flex: 1,
  },
  datePicker: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  dateText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 10
  },
  searchButton: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 80,
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: "#cd3f3e",
  },
  searchButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});
