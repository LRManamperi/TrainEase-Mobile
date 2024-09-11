import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";
import moment from "moment";
import { useSelector } from 'react-redux';
import { BASE_URL } from "@env"; 
import YourTripsWillAppearHere from "../assets/trips.png"; 

export default function BookingHistory({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      async function fetchBookingHistory() {
        try {
          const response = await axios.get(`${BASE_URL}/api/user/history`);
          setBookings(response.data);
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
  }, [currentUser]);

  const handleCancelBooking = async (bookingId) => {
    try {
      console.log('BASE_URL:', BASE_URL);
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

  const currentDate = moment();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading booking history.</Text>;

  if (!currentUser) {
    return (
      <View style={styles.noBookingsContainer}>
        <Image source={YourTripsWillAppearHere} style={styles.noBookingsImage} />
        <Text style={styles.noBookingsText}>Please log in to see your booking history.</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.noBookingsContainer}>
        <Image source={YourTripsWillAppearHere} style={styles.noBookingsImage} />
        <Text style={styles.noBookingsText}>Your trips will appear here once booked!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {bookings.map((booking, index) => {
        const bookingDate = moment(booking.date);
        const isPastBooking = bookingDate.isBefore(currentDate, 'minute');

        const trainName = booking.scheduleRef.trainRef?.name || 'Unknown Train';
        const fromStation = booking.from.stationRef?.name || 'Unknown Station';
        const toStation = booking.to.stationRef?.name || 'Unknown Station';

        return (
          <View key={index} style={styles.bookingCard}>
            <Text style={styles.bookingTextHeader}>{trainName}</Text>
            <Text style={styles.bookingText}>From: {fromStation}</Text>
            <Text style={styles.bookingText}>To: {toStation}</Text>
            <Text style={styles.bookingText}>Date: {bookingDate.format("MMMM Do YYYY")}</Text>
            <Text style={styles.bookingText}>Passengers: {booking.seats.length}</Text>
            <Text style={styles.bookingText}>Total Amount: {booking.totalAmount} LKR</Text>

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
    padding: 9,
    marginBottom: 1,
    elevation: 3,
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
});
