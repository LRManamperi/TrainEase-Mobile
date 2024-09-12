import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";
import moment from "moment";
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'; // Import the hook
import { BASE_URL } from "@env"; 
import YourTripsWillAppearHere from "../assets/trips.png"; 
import { useTheme } from "../ThemeContext/ThemeProvider";
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from "../components/LoadingScreen";

export default function BookingHistory({ navigation }) {
  const { isDarkMode } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        async function fetchBookingHistory() {
          try {
            setLoading(true); // Start loading when fetching new data
            const response = await axios.get(`${BASE_URL}/api/user/history`);
            const sortedBookings = response.data.sort((a, b) => moment(b.date).diff(moment(a.date))); // Sort by date
            setBookings(sortedBookings);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        }
        fetchBookingHistory();
      } else {
        setLoading(false); // Stop loading if the user is not logged in
      }
    }, [currentUser])
  );

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/user/cancelBooking/${bookingId}`);
      if (response.status === 200) {
        Alert.alert("Success", "Booking cancelled successfully");
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      }
    } catch (error) {
      console.error("Cancel Booking Error:", error.response || error);
      Alert.alert("Error", "Failed to cancel booking. Please try again.");
    }
  };

  const currentDate = moment(); // Initialize current date

  if (loading) return <LoadingSpinner />;
  if (error) return <Text>Error loading booking history.</Text>;

  if (!currentUser) {
    return (
      <View style={[styles.noBookingsContainer, isDarkMode && styles.darkContainer]}>
        <Image source={YourTripsWillAppearHere} style={styles.noBookingsImage} />
        <Text style={styles.noBookingsText}>Please log in to see your booking history.</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={[styles.noBookingsContainer, isDarkMode && styles.darkContainer]}>
        <Image source={YourTripsWillAppearHere} style={styles.noBookingsImage} />
        <Text style={[styles.noBookingsText, isDarkMode && styles.darkText]}>Your trips will appear here once booked!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {bookings.map((booking, index) => {
        const bookingDate = moment.utc(booking.date).local();
        const isPastBooking = bookingDate.isBefore(currentDate) || bookingDate.isSame(currentDate);

        const trainName = booking.scheduleRef.trainRef?.name || 'Unknown Train';
        const fromStation = booking.from.stationRef?.name || 'Unknown Station';
        const toStation = booking.to.stationRef?.name || 'Unknown Station';

        return (
          <View key={index} style={[styles.bookingCard, isDarkMode && styles.bookingCardDark]}>
            <View style={styles.bookingHeader}>
              <Text style={[styles.bookingTextHeader, isDarkMode && styles.darkText]}>{trainName}</Text>
              <Text style={[styles.bookingDate, isDarkMode && styles.darkText]}>{bookingDate.format("MMMM Do YYYY")}</Text>
            </View>
            <View>
              <Text style={[styles.bookingText, isDarkMode && styles.darkText]}>From: {fromStation}</Text>
              <Text style={[styles.bookingText, isDarkMode && styles.darkText]}>To: {toStation}</Text>
            </View>
            <Text style={[styles.bookingText, isDarkMode && styles.darkText]}>Passengers: {booking.seats.length}</Text>
            <Text style={[styles.bookingText, isDarkMode && styles.darkText]}>Total Amount: {booking.totalAmount} LKR</Text>

            {isPastBooking ? (
              <Text style={styles.cancelNotAllowedText}>Cancellation not allowed for past bookings</Text>
            ) : (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelBooking(booking._id)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBookingsImage: {
    width: 400,
    height: 500,
    marginBottom: 20,
  },
  noBookingsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontWeight: "bold",
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bookingCardDark: {
    backgroundColor: '#1e1e1e',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingText: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookingTextHeader: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  bookingDate: {
    fontSize: 14,
    color: "#999",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 5,
    marginLeft: "auto",
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelNotAllowedText: {
    marginTop: 10,
    color: '#D9534F',
    fontSize: 12,
    textAlign: "right",
    fontWeight: "bold",
  },
  darkText: {
    color: '#fff',
  },
});
