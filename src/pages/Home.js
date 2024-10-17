import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import * as Location from 'expo-location'; 
import backgroundImage from "../assets/train.png";
import { formatDate } from "../utils/Utils";
import { BASE_URL } from "@env";  
import { useTheme } from "../ThemeContext/ThemeProvider";
import Bot from "../components/Bot";

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);  // Initialize as null
  const [show, setShow] = useState(false);
  const [stations, setStations] = useState([]);


  // useEffect(() => {
  //   async function fetchStations() {
  //     try {

  //       console.log('BASE_URL:', BASE_URL);
  //       const response = await axios.get(`${BASE_URL}/api/search/stations`);
  //       setStations(response.data.map(station => ({ label: station.name })));
  //     } catch (error) {
  //       console.error("Error fetching stations:", error); 
  //       Alert.alert("Error", "Failed to fetch stations");
  //     }
  //   }

  //   async function getCurrentLocation() {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         Alert.alert('Permission to access location was denied');
  //         return;
  //       }
  //       const location = await Location.getCurrentPositionAsync({});
  //       const [place] = await Location.reverseGeocodeAsync({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       });
        

  //       const cityName = place.city;
  //       const matchedStation = stations.find(station => station.label.toLowerCase().includes(cityName.toLowerCase()));


  //       if (matchedStation) {
  //         setSelectedValue1(matchedStation.label);
  //       } else {
  //         console.log('City not matched with stations');
  //       }
  //     } catch (error) {
  //       console.error("Error getting location or city:", error);
  //       Alert.alert("Error", "Failed to get current location");
  //     }
  //   }

  //   fetchStations().then(() => {
  //     getCurrentLocation(); 
  //   });
  // }, [BASE_URL]);  // Adjusted dependency array

  

  useEffect(() => {
    async function fetchStations() {
      try {
        console.log('BASE_URL:', BASE_URL);
        const response = await axios.get(`${BASE_URL}/api/search/stations`);
        const fetchedStations = response.data.map(station => ({ label: station.name }));
        setStations(fetchedStations);
  
        // After stations are fetched, call getCurrentLocation
        await getCurrentLocation(fetchedStations); 
      } catch (error) {
        console.error("Error fetching stations:", error);
        Alert.alert("Error", "Failed to fetch stations");
      }
    }
  
    async function getCurrentLocation(fetchedStations) {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const [place] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  
        const cityName = place.city;
        const matchedStation = fetchedStations.find(station => station.label.toLowerCase().includes(cityName.toLowerCase()));
  
        if (matchedStation) {
          setSelectedValue1(matchedStation.label); // Update "From" station based on location
        } else {
          console.log('City not matched with stations');
        }
      } catch (error) {
        console.error("Error getting location or city:", error);
        Alert.alert("Error", "Failed to get current location");
      }
    }
  
    fetchStations();  // Fetch stations first
  }, [BASE_URL]);  // Adjusted dependency array
  

  const onChange = (event, date) => {
    setShow(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleSearch = () => {
    if (!selectedValue1 || !selectedValue2 || !selectedDate) {
      Alert.alert("Hold on a moment!", "It looks like some fields are still empty. Please take a moment to fill them in so we can help you better.");
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
            style={isDarkMode ? styles.pickerDark : styles.picker}
            onValueChange={(itemValue) => setSelectedValue1(itemValue)}
            dropdownIconColor={isDarkMode ? 'white' : 'black'} 
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
            style={isDarkMode ? styles.pickerDark : styles.picker}
            onValueChange={(itemValue) => setSelectedValue2(itemValue)}
          >
            <Picker.Item label="To" value="" />
            {stations.map((station, index) => (
              <Picker.Item key={index} label={station.label} value={station.label} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity onPress={showDatepicker}>
          <View style={isDarkMode ? styles.datePickerDark : styles.datePicker}>
            <Text style={isDarkMode ? styles.dateTextDark : styles.dateText}>
              {selectedDate ? formatDate(selectedDate) : "mm/dd/yyyy"}
            </Text>
            <FontAwesome name="calendar-o" size={24} color={isDarkMode ? "white" : "black"} />
          </View>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate || new Date()}
            mode="date"  // Explicitly set mode to 'date'
            minimumDate={new Date()}  // Keeps booking for today and future
            maximumDate={new Date(2100, 12, 31)}  // Optional: Set a reasonable maximum date
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* <Bot />  */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  picker: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    marginBottom: 7,
    borderRadius: 15,
    color: "black",
  },
  pickerDark: {
    backgroundColor: '#121212',
    width: "100%",
    height: 50,
    marginBottom: 7,
    borderRadius: 15,
    color: "white",
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
    marginRight: 20,
  },
  datePickerDark: {
    backgroundColor: '#121212',
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginRight: 20,
  },
  dateText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 10
  },
  dateTextDark: {
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 10,
    color: "white",
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
