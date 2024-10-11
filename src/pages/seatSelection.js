import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Dimensions, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import SeatLayout from '../components/seatLayout';
import TripSummary from '../components/tripSummary';
import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext/ThemeProvider';
import LoadingSpinner from '../components/LoadingScreen';

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
    return <LoadingSpinner/>;
    // <Text style={styles.loadingText}>Loading...</Text>;
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
    fontSize: 22,
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
