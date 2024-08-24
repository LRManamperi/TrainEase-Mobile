// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import getTimeDiffInMins from "../utils/timeDuration"; 

// export default function TrainDetails() {
//   const [trainDetails, setTrainDetails] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const navigation = useNavigation();

//   // Mock Data
//   const mockTrainDetails = {
//     fromStation: "Colombo Fort",
//     toStation: "Galle",
//     coachTypes: [
//       {
//         _id: "1",
//         name: "1st Class",
//         priceFactor: 1.5,
//         facilities: ["Free Drinks", "Free Wifi", "Power Outlets", "Quiet Car"],
//         available: true,
//       },
//       {
//         _id: "2",
//         name: "2nd Class",
//         priceFactor: 1.2,
//         facilities: ["Free Wifi", "Power Outlets", "Reclining Seats"],
//         available: true,
//       },
//       {
//         _id: "3",
//         name: "3rd Class",
//         priceFactor: 1.0,
//         facilities: ["Basic Seating", "Open Windows"],
//         available: false,
//       },
//     ],
//   };

//   const mockSchedule = {
//     trainRef: { name: "Galu Kumari" },
//   };

//   const mockFromStop = {
//     departureTime: "05:05",
//     price: 500,
//   };

//   const mockToStop = {
//     arrivalTime: "07:34",
//     price: 1000,
//   };

//   const mockDate = "2024-08-21";

//   useEffect(() => {
//     // Simulate fetching data from the backend
//     setTrainDetails(mockTrainDetails);
//   }, []);

//   if (!trainDetails) return <Text>Loading...</Text>;

//   const calculateClassPrice = (priceFactor) => {
//     return (mockToStop.price - mockFromStop.price) * priceFactor;
//   };

//   const handleClassClick = (classOption) => {
//     if (classOption.available) {
//       setSelectedClass(classOption);
//       navigation.navigate("SeatSelection", {
//         selectedClass: {
//           _id: classOption._id,
//           name: classOption.name,
//           priceFactor: classOption.priceFactor,
//         },
//         schedule: mockSchedule,
//         fromStop: mockFromStop,
//         toStop: mockToStop,
//         date: mockDate,
//       });
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>
//         {trainDetails.fromStation} 
//         <Icon name="arrow-forward" style={styles.arrowIcon} />
//         {trainDetails.toStation}
//       </Text>

//       {/* Train Info Card */}
//       <View style={styles.card}>
//         <View style={styles.trainInfo}>
//           <Icon name="train" style={styles.trainIcon} />
//           <Text style={styles.trainName}>{mockSchedule.trainRef.name}</Text>
//         </View>

//         <View style={styles.stopInfo}>
//           <View style={styles.stop}>
//             <Text style={styles.time}>{mockFromStop.departureTime}</Text>
//             <Icon name="location-on" style={styles.startLocationIcon} />
//             <Text style={styles.stationName}>{trainDetails.fromStation}</Text>
//           </View>
//           <View style={styles.durationContainer}>
//             <View style={styles.line} />
//             <Text style={styles.duration}>{getTimeDiffInMins(mockFromStop.departureTime, mockToStop.arrivalTime)}</Text>
//           </View>
//           <View style={styles.stop}>
//             <Text style={styles.time}>{mockToStop.arrivalTime}</Text>
//             <Icon name="location-on" style={styles.endLocationIcon} />
//             <Text style={styles.stationName}>{trainDetails.toStation}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Class Options Slider */}
//       <FlatList
//         data={trainDetails.coachTypes}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item: classOption }) => (
//           <TouchableOpacity
//             style={[
//               styles.classOption,
//               selectedClass && selectedClass._id === classOption._id
//                 ? styles.selectedClass
//                 : null,
//             ]}
//             onPress={() => {
//               if (classOption.available) {
//                 handleClassClick(classOption);
//               }
//             }}
//             disabled={!classOption.available}
//           >
//             <View style={styles.classHeader}>
//               <Text style={styles.className}>{classOption.name}</Text>
//               <Text style={styles.classPrice}>Rs. {calculateClassPrice(classOption.priceFactor)}.00</Text>
//             </View>
//             <View>
//               {classOption.facilities.slice(0, 3).map((facility, index) => (
//                 <View key={index} style={styles.facility}>
//                   <Icon name="check" style={styles.checkIcon} />
//                   <Text>{facility}</Text>
//                 </View>
//               ))}
//             </View>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
//       />

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     alignContent: "center",
//   },
//   title: {
//     fontSize: 21,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   arrowIcon: {
//     fontSize: 24,
//     color: "#207497",
//     marginHorizontal: 10,
//   },
//   card: {
//     padding: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     backgroundColor: "#F1F8FB",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   trainInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center", // Center horizontally
//     marginBottom: 10,
//   },
//   trainIcon: {
//     fontSize: 24,
//     marginRight: 10,
//   },
//   trainName: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   stopInfo: {
//     marginBottom: 20,
//   },
//   stop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center", // Center stop info horizontally
//     marginBottom: 10,
//   },
//   time: {
//     fontSize: 18,
//     marginRight: 10,
//   },
//   stationName: {
//     fontSize: 18,
//   },
//   startLocationIcon: {
//     fontSize: 24,
//     color: "#207497",
//     marginRight: 10,
//   },
//   endLocationIcon: {
//     fontSize: 24,
//     color: "#D32F2F",
//     marginRight: 10,
//   },
//   durationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center", // Center duration horizontally
//     marginBottom: 10,
//   },
//   line: {
//     width: 2,
//     height: 40,
//     backgroundColor: "black",
//     marginRight: 10,
//   },
//   duration: {
//     fontSize: 18,
//   },
//   classOption: {
//     padding: 20, // Increase padding for a larger height
//     marginRight: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#207497",
//     width: 325,
//     height: 200, // Set a fixed height to make cards taller
//   },
//   selectedClass: {
//     borderWidth: 2,
//     borderColor: "#1976D2",
//     backgroundColor: "#DEF0F8",
//   },
//   classHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   className: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1976D2",
//   },
//   classPrice: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   facility: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   checkIcon: {
//     fontSize: 18,
//     color: "#207497",
//     marginRight: 10,
//   },
// });



import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import getTimeDiffInMins from "../utils/timeDuration";

export default function TrainDetails({ route }) {
  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigation = useNavigation();

  const { schedule, fromStop, toStop, date } = route.params;

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const scheduleId = schedule?._id;
        const fromStopId = fromStop?._id;
        const toStopId = toStop?._id;

        if (!scheduleId || !fromStopId || !toStopId) {
          console.error("Missing _id in one of the objects:", { scheduleId, fromStopId, toStopId });
          return;
        }

        const response = await axios.get("http://192.168.8.101:3000/api/train-details", {
          params: { scheduleId, fromStopId, toStopId },
        });
        setTrainDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch train details:", error);
      }
    };

    fetchTrainDetails();
  }, [schedule, fromStop, toStop]);

  if (!trainDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#207497" />
      </View>
    );
  }

  const calculateClassPrice = (priceFactor) => {
    return (toStop.price - fromStop.price) * priceFactor;
  };

  const handleClassClick = (classOption) => {
    if (classOption && classOption.available && classOption._id) {
      setSelectedClass(classOption);
      navigation.navigate("SeatSelection", {
        selectedClass: {
          _id: classOption._id,
          name: classOption.name,
          priceFactor: classOption.priceFactor,
        },
        schedule,
        fromStop,
        toStop,
        date,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {trainDetails.fromStation} 
        <Icon name="arrow-forward" style={styles.arrowIcon} />
        {trainDetails.toStation}
      </Text>

      {/* Train Info Card */}
      <View style={styles.card}>
        <View style={styles.trainInfo}>
          <Icon name="train" style={styles.trainIcon} />
          <Text style={styles.trainName}>{schedule?.trainRef?.name}</Text>
        </View>

        <View style={styles.stopInfo}>
          <View style={styles.stop}>
            <Text style={styles.time}>{fromStop?.departureTime}</Text>
            <Icon name="location-on" style={styles.startLocationIcon} />
            <Text style={styles.stationName}>{trainDetails.fromStation}</Text>
          </View>
          <View style={styles.durationContainer}>
            <View style={styles.line} />
            <Text style={styles.duration}>{getTimeDiffInMins(fromStop?.departureTime, toStop?.arrivalTime)}</Text>
          </View>
          <View style={styles.stop}>
            <Text style={styles.time}>{toStop?.arrivalTime}</Text>
            <Icon name="location-on" style={styles.endLocationIcon} />
            <Text style={styles.stationName}>{trainDetails.toStation}</Text>
          </View>
        </View>
      </View>

      {/* Class Options Slider */}
      <FlatList
        data={trainDetails.coachTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item: classOption }) => (
          <TouchableOpacity
            style={[
              styles.classOption,
              selectedClass && selectedClass._id === classOption._id
                ? styles.selectedClass
                : null,
            ]}
            onPress={() => handleClassClick(classOption)}
            disabled={!classOption.available}
          >
            <View style={styles.classHeader}>
              <Text style={styles.className}>{classOption.name}</Text>
              <Text style={styles.classPrice}>Rs. {calculateClassPrice(classOption.priceFactor)}.00</Text>
            </View>
            <View>
              {classOption.facilities.slice(0, 3).map((facility, index) => (
                <View key={index} style={styles.facility}>
                  <Icon name="check" style={styles.checkIcon} />
                  <Text>{facility}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 20,
  },
  arrowIcon: {
    fontSize: 24,
    color: "#207497",
    marginHorizontal: 10,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#F1F8FB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  trainInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  trainIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  trainName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stopInfo: {
    marginBottom: 20,
  },
  stop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    marginRight: 10,
  },
  stationName: {
    fontSize: 18,
  },
  startLocationIcon: {
    fontSize: 24,
    color: "#207497",
    marginRight: 10,
  },
  endLocationIcon: {
    fontSize: 24,
    color: "#D32F2F",
    marginRight: 10,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: "black",
    marginLeft: 110,
  },
  duration: {
    fontSize: 18,
  },
  classOption: {
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#207497",
    width: 325,
    height: 200,
  },
  selectedClass: {
    borderWidth: 2,
    borderColor: "#1976D2",
    backgroundColor: "#DEF0F8",
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  className: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
  },
  classPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  facility: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkIcon: {
    fontSize: 18,
    color: "#207497",
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
