import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';

export default function ReportIssuesScreen() {
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const endpoint = 'https://formspree.io/f/xovazqey';

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !issue) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send the email via Formspree
      const response = await axios.post(endpoint, {
        email: email,
        issue: issue,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your issue has been reported. Thank you!');
        setEmail('');
        setIssue('');
      } else {
        Alert.alert('Error', 'Failed to send your issue. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to send issue report:', error);
      Alert.alert('Error', 'Failed to send your issue. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="report-problem" size={24} color="gray" style={styles.icon} />
        <Text style={styles.headerText}>Report App Issues</Text>
      </View>

      <Text style={styles.label}>Your Email</Text>
      <TextInput
        mode="outlined"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Describe the Issue</Text>
      <TextInput
        mode="outlined"
        placeholder="Describe the issue you're facing"
        value={issue}
        onChangeText={setIssue}
        multiline
        numberOfLines={5}
        style={[styles.input, styles.issueInput]}
        maxLength={500} // Limit the character count to 500
      />
      <Text style={styles.characterCount}>{issue.length}/500</Text>

      {isSubmitting ? (
        <ActivityIndicator size="large" color="#CD3F3E" />
      ) : (
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.submitButton}
        >
          <Text style = {styles.buttonText}>Submit Issue</Text>
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 16,
  },
  issueInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    color: 'gray',
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 10,
    backgroundColor: '#CD3F3E',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
