import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button, Snackbar, HelperText } from 'react-native-paper';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '../../validationSchemas';
import CustomInput from '../components/CustomInput';
import { BASE_URL } from "@env";

export default function ForgotPassword({ navigation }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data) => {
    setError('');
    setMessage('');
    setSnackbarVisible(false);
    try {
        console.log(BASE_URL);
      const response = await axios.post(`${BASE_URL}/api/user/forgotPassword`, data); // Ensure BASE_URL is correct
      setMessage(response.data.message || 'A reset link has been sent to your email.');
      setSnackbarVisible(true);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
      setSnackbarVisible(true);
      console.error('Forgot password error:', error);
      Alert.alert('Network Error', 'Unable to reach the server. Please check your connection and try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}testID="forgot-password-header">Forgot Password</Text>
      {message && (
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={4000} testID="success-message-snackbar">
          {message}
        </Snackbar>
      )}
      {error && (
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={4000} style={styles.error}testID="error-message-snackbar">
          {error}
        </Snackbar>
      )}
      <CustomInput
        label="Email Address"
        mode="outlined"
        onChange={text => setValue('email', text)}
        error={!!errors.email}
        style={styles.input}
        testID="email-input"
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email?.message}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit(handleForgotPassword)}
        style={styles.button}
        testID="send-reset-link-button"
      >
        Send Reset Link
      </Button>
      <Button
        mode="text"
        textColor="black"
        onPress={() => navigation.navigate('Login')}
        testID="back-to-login-button"
      >
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: 'black',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
});
