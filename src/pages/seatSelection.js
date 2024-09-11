// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import SeatLayout from '../components/seatLayout';  
// import TripSummary from '../components/tripSummary'; 
// import CheckOut from './Checkout';

// const SeatSelection = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const navigation = useNavigation();

//   // Mock trip and seat data
//   const tripData = {
//     selectedClass: { name: '1st Class', priceFactor: 1.5 },
//     fromStop: { name: 'Belatta', stationRef: 'BLT', departureTime: '10:00 AM', price: 500 },
//     toStop: { name: 'Galle', stationRef: 'GL', arrivalTime: '12:00 PM', price: 1500 },
//     date: '2024-07-01',
//     schedule: { trainRef: { name: 'Train 1001' } },
//     holdTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),  // Hold time set for 15 minutes
//   };

//   const seats = [
//     { _id: 'seat1', name: '1A', position: [10, 10] },
//     { _id: 'seat2', name: '1B', position: [80, 10] },
//     { _id: 'seat3', name: '2A', position: [10, 80] },
//     { _id: 'seat4', name: '2B', position: [80, 80] },
//     { _id: 'seat5', name: '3A', position: [10, 150] },
//     { _id: 'seat6', name: '3B', position: [80, 150] },
//     { _id: 'seat7', name: '4A', position: [10, 220] },
//     { _id: 'seat8', name: '4B', position: [80, 220] },
//     { _id: 'seat9', name: '5A', position: [10, 290] },
//     { _id: 'seat10', name: '5B', position: [80, 290] },
//     //right side
//     { _id: 'seat11', name: '6A', position: [200, 10] },
//     { _id: 'seat12', name: '6B', position: [270, 10] },
//     { _id: 'seat13', name: '7A', position: [200, 80] },
//     { _id: 'seat14', name: '7B', position: [270, 80] },
//     { _id: 'seat15', name: '8A', position: [200, 150] },
//     { _id: 'seat16', name: '8B', position: [270, 150] },
//     { _id: 'seat17', name: '9A', position: [200, 220] },
//     { _id: 'seat18', name: '9B', position: [270, 220] },
//     { _id: 'seat19', name: '10A', position: [200, 290] },
//     { _id: 'seat20', name: '10B', position: [270, 290] },
//   ];

//   const bookedSeats = ['seat2'];

//   // Seat selection handler
//   const handleSeatSelection = (seatId) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   // Proceed to checkout
//   const goToCheckout = () => {
//     if (selectedSeats.length === 0) {
//       Alert.alert("No Seats Selected", "Please select at least one seat.");
//       return;
//     }

//     navigation.navigate('Checkout', {
//       selectedSeats,
//       totalSeats: selectedSeats.length,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Seat Selection</Text>

//       <SeatLayout
//         seats={seats}
//         bookedSeats={bookedSeats}
//         selectedSeats={selectedSeats}
//         onSeatSelection={handleSeatSelection}
//       />

//       <TripSummary
//         selectedClass={tripData.selectedClass}
//         fromStop={tripData.fromStop}
//         toStop={tripData.toStop}
//         date={tripData.date}
//         selectedSeatCount={selectedSeats.length}
//         trainName={tripData.schedule.trainRef.name}
//         holdTime={tripData.holdTime}
//         isSuccessful={false}  // Booking state
//       />

//       <TouchableOpacity style={styles.checkoutButton} onPress={goToCheckout}>
//         <Text style={styles.checkoutButtonText}>Checkout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   checkoutButton: {
//     backgroundColor: '#D9534F',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SeatSelection;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Dimensions, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import SeatLayout from '../components/seatLayout';
import TripSummary from '../components/tripSummary';
import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext/ThemeProvider';

const SeatSelection = () => {
  const { isDarkMode } = useTheme();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);
  const {currentUser} = useSelector(state => state.user);

  const navigation = useNavigation();
  const route = useRoute();

  const { selectedClass, fromStop, toStop, date, schedule } = route.params;

  const screenWidth = Dimensions.get('window').width - 32; // Full screen width minus padding
  const lineWidth = new Animated.Value(0);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/search/coach-details`, {
          params: {
            date,
            fromStopId: fromStop._id,
            toStopId: toStop._id,
            scheduleId: schedule._id,
            selectedClassId: selectedClass._id,
          },
        });
        const coachesData = response.data.requestedClassCoaches;
        setCoaches(coachesData);
        setBookedSeats(coachesData.flatMap(coach => coach.alreadyBookedSeats));
      } catch (error) {
        console.error("Error fetching seat data", error);
        Alert.alert("Error", "Failed to fetch seat details.");
      }
    };

    fetchSeatData();
  }, [date, fromStop, toStop, schedule, selectedClass]);

  useEffect(() => {
    // Animate the line width based on the current coach index
    Animated.timing(lineWidth, {
      toValue: (currentCoachIndex + 1) * (screenWidth / coaches.length),
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [currentCoachIndex, screenWidth, coaches.length]);

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const goToCheckout = async () => {
    if (selectedSeats.length === 0) {
      Alert.alert("No Seats Selected", "Please select at least one seat.");
      return;
    }

    try {
      console.log('BASE_URL:', BASE_URL);
      
      const response = await axios.post(`${BASE_URL}/api/booking/holdSeats`, {
        userId: currentUser._id,
        scheduleId: schedule._id,
        fromStopId: fromStop._id,
        toStopId: toStop._id,
        selectedSeatIds: selectedSeats,
        selectedClassId: selectedClass._id,
        date,
      });

      if (response.status === 200) {
        navigation.navigate('Checkout', {
          selectedSeats,
          selectedClass,
          fromStop,
          toStop,
          date,
          schedule,
          bookingId: response.data.bookingId,
          expireTime: response.data.expireTime,
        });
      }
    } catch (error) {
      console.error("Error during checkout", error);
      Alert.alert("Error", "Failed to hold the seats for checkout.");
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / screenWidth);
    setCurrentCoachIndex(newIndex);
  };

  if (!coaches.length) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>{selectedClass.name} </Text>

      {/* Scrollable coach layout */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        scrollEventThrottle={16}
        onScroll={handleScroll}  // Track the scroll event
        contentContainerStyle={styles.coachContainer}
      >
        {coaches.map((coach) => (
          <View key={coach._id} style={styles.coachBox}>
            <Text style={[styles.coachNumber, isDarkMode && styles.darkText]}>Coach No: {coach.coachNumber}</Text>
            <SeatLayout
              seats={coach.seats}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onSeatSelection={handleSeatSelection}
              seatClass={selectedClass}
            />
          </View>
        ))}
      </ScrollView>

      {/* Line Indicator */}
      <View style={styles.lineContainer}>
        <Animated.View style={[styles.activeLine, { width: lineWidth }]} />
      </View>

      {/* Trip Summary after the coach section */}
      <View style={styles.summaryContainer}>
        <TripSummary
          selectedClass={selectedClass}
          fromStop={fromStop}
          toStop={toStop}
          date={date}
          selectedSeatCount={selectedSeats.length}
          trainName={schedule.trainRef.name}
          holdTime={new Date(Date.now() + 5 * 60 * 1000).toISOString()} // Hold time for 5 minutes
        />

        <TouchableOpacity style={styles.checkoutButton} onPress={goToCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  coachContainer: {
    flexDirection: 'row',
  },
  coachBox: {
    width: 440, // Full screen width minus padding
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 8,
    height: 525,
  },
  coachNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryContainer: {
    marginTop: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  checkoutButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  darkText: {
    color: '#fff',
  },
  lineContainer: {
    height: 10,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginLeft: 16,
    borderRadius: 5,
  },
  activeLine: {
    height: 10,
    backgroundColor: '#1976D2',
    borderRadius: 5,
  },
});

export default SeatSelection;
