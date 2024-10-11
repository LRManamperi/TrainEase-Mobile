import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";
import moment from "moment";
import { useSelector } from 'react-redux';
import { BASE_URL } from "@env";
import NoTransactionsImage from "../assets/NoTransactions.png";
import { useTheme } from "../ThemeContext/ThemeProvider";

export default function TransactionsScreen() {
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  
  
  useEffect(() => {
    if (currentUser) {
      async function fetchTransactions() {
        try {
          
          const response = await axios.get(`${BASE_URL}/api/user/history`);
          const bookings = response.data;

          // Map through bookings and extract relevant transaction data
          const transactionData = bookings.map(booking => ({
            date: booking.date,
            totalAmount: booking.totalAmount,
            bookingId: booking._id
          }));

          setTransactions(transactionData);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }

      fetchTransactions();
    } else {
      setLoading(false); // Stop loading if the user is not logged in
    }
  }, [currentUser]);

  const currentDate = moment();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transactions.</Text>;

  if (!currentUser) {
    return (
      <View style={[styles.noTransactionsContainer, isDarkMode && styles.darkContainer]}>
        <Image source={NoTransactionsImage} style={styles.noTransactionsImage} />
        <Text style={styles.noTransactionsText}>Please log in to see your transactions.</Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={[styles.noTransactionsContainer, isDarkMode && styles.darkContainer]}>
        <Image source={NoTransactionsImage} style={styles.noTransactionsImage} />
        <Text style={[styles.noTransactionsText, isDarkMode && styles.darkText]}>
          No transactions available. Once you make a transaction, it will appear here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {transactions.map((transaction, index) => {
        const transactionDate = moment(transaction.date);

        return (
          <View key={index} style={[styles.transactionCard, isDarkMode && styles.transactionCardDark]}>
            <Text style={[styles.transactionTextHeader, isDarkMode && styles.darkText]}>
              Transaction {index + 1}
            </Text>
            <Text style={[styles.transactionText, isDarkMode && styles.darkText]}>
              Booking ID: {transaction.bookingId}
            </Text>
            <Text style={[styles.transactionText, isDarkMode && styles.darkText]}>
              Date: {transactionDate.format("MMMM Do YYYY")}
            </Text>
            <Text style={[styles.transactionText, isDarkMode && styles.darkText]}>
              Total Amount: {transaction.totalAmount} LKR
            </Text>
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
  noTransactionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTransactionsImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  noTransactionsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 20,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 9,
    marginBottom: 1,
    elevation: 3,
  },
  transactionCardDark: {
    backgroundColor:'#121212',
  },
  transactionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  transactionTextHeader: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  darkText: {
    color: '#fff',
  },
});
