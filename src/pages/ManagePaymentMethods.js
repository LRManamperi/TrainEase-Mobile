import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { useTheme } from '../ThemeContext/ThemeProvider'; // Custom hook for theme
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ManagePaymentMethods() {
  const { isDarkMode } = useTheme(); 
  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleAddPaymentMethod = () => {
    if (!cardNumber || !cardHolderName || !expiryDate || !securityCode) {
      Alert.alert('Error', 'Please fill in all the card details.');
      return;
    }

    Alert.alert('Success', 'Payment method added successfully!');
    // Add payment method logic here
  };

  
  
  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <Card style={styles.card}>
        <Card.Title
          title="Select Payment Method"
          left={() => <Icon name="credit-card" size={28} color={isDarkMode ? 'black' : '#000'} />}
        />
        <Card.Content>
          <RadioButton.Group
            onValueChange={(newValue) => setSelectedMethod(newValue)}
            value={selectedMethod}
          >
            <View style={styles.radioItem}>
              <RadioButton value="credit-card" color="lightblue" />
              <Text style={[styles.radioLabel, isDarkMode && styles.darkText]}>Credit Card</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="debit-card" color="lightblue" />
              <Text style={[styles.radioLabel, isDarkMode && styles.darkText]}>Debit Card</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="paypal" color="lightblue" />
              <Text style={[styles.radioLabel, isDarkMode && styles.darkText]}>PayPal</Text>
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText1]}>Add a New Payment Method</Text>

      <TextInput
        mode="outlined"
        label="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={styles.input}
        theme={{ colors: { primary: 'lightblue' } }}
      />
      <TextInput
        mode="outlined"
        label="Card Holder's Name"
        value={cardHolderName}
        onChangeText={setCardHolderName}
        style={styles.input}
        theme={{ colors: { primary: 'lightblue' } }}
      />
      <View style={styles.expiryCVCContainer}>
        <TextInput
          mode="outlined"
          label="Expiry Date (MM/YY)"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
          style={[styles.input, styles.expiryInput]}
          theme={{ colors: { primary: 'lightblue' } }}
          maxLength={5}
        />
        <TextInput
          mode="outlined"
          label="Security Code (CVC)"
          value={securityCode}
          onChangeText={setSecurityCode}
          keyboardType="numeric"
          style={[styles.input, styles.cvcInput]}
          theme={{ colors: { primary: 'lightblue' } }}
          maxLength={4}
        />
      </View>

      <Button mode="contained" onPress={handleAddPaymentMethod} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Payment Method</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: 'black',
  },
    darkText1: {
        color: 'white',
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioLabel: {
    marginLeft: 8,
  },
  input: {
    marginBottom: 16,
  },
  expiryCVCContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    flex: 1,
    marginRight: 8,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    marginTop: 24,
    backgroundColor: '#CD3F3E',
    borderRadius: 10,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
