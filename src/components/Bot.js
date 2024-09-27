import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import axios from 'axios';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatVisible, setChatVisible] = useState(false); // To toggle chat visibility
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initialize animation value

  const sendMessage = async () => {
    if (input.trim() === ''){
        console.log('Please type a message!'); // Don't send empty messages
        return;
    } 
    console.log('Sending message:', input);

    try {
      const response = await axios.get('https://api.wit.ai/message', {
        params: {
          q: input,
        },
        headers: {
          Authorization: `Bearer OTA7LVJDMGV7OI6W2POHKZKTBYFIDGWY`,
        },
      });
      console.log('Wit.ai response:', response.data);

    const intent = response.data.intents.length > 0 ? response.data.intents[0].name : null;
    let botReply = '';

    if (intent === 'cancelbooking') {
      botReply = 'To cancel your booking, visit the Booking History section in your account. Select the booking you want to cancel and click on the "Cancel" button.';
    } else if (intent === 'checkstatus') {
      botReply = 'To check the status of your booking, please go to the "Booking History" section. You will see a list of all your bookings along with their current status.';
    } else if (intent === 'bookticket') {
      botReply = 'To book a ticket, go to the "Home" section, select your departure and arrival stations, choose the travel date, and proceed with payment.';
    } else if (intent === 'greeting') {
      botReply = 'Hello! I am here to help you with your bookings. How can I assist you today?';
    } else if (intent === 'goodbye') {
      botReply = 'Goodbye! Feel free to reach out if you need any further assistance. Have a safe journey!';
    } else if (intent === 'thanks') {
      botReply = 'You’re welcome! Let me know if you need any further help.';
    } else if (intent === 'help') {
      botReply = 'I can assist you with booking tickets, checking booking status, canceling bookings, or providing seat details. Just let me know what you’d like help with!';
    } else if (intent === 'bookseats') {
      botReply = 'To book specific seats, go to the "Seat Selection" section after choosing your train and journey details. You can select your preferred seats from the available options.';
    } else {
      botReply = 'I’m sorry, I didn’t quite understand your question. Can you please rephrase or ask for help if you’re unsure what to do?';
    }
    
      


     

      setMessages([
        ...messages,
        { text: input, from: 'user' },
        { text: botReply, from: 'bot' },
      ]);
      setInput('');
    } catch (error) {
      console.error('Error with Wit.ai:', error);
    }
  };

  const toggleChat = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5, // Enlarge the icon
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Return to original size
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setChatVisible(!chatVisible); // Toggle chat window
  };

  return (
    <View style={styles.container}>
      {chatVisible && (
        <View style={styles.chatContainer}>
          <ScrollView>
            {messages.map((msg, index) => (
              <Text key={index} style={msg.from === 'user' ? styles.userMessage : styles.botMessage}>
                {msg.text}
              </Text>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            color="black"
          />
          <Button title="Send" onPress={sendMessage} color= "#cd3f3e"/>
        </View>
      )}

      <TouchableOpacity onPress={toggleChat} style={styles.chatIconContainer}>
        <Animated.Image
          source={require('../assets/robot.png')} 
          style={[styles.chatIcon, { transform: [{ scale: scaleAnim }] }]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  userMessage: {
    textAlign: 'right',
    marginBottom: 5,
    backgroundColor: '#d1d1d1',
    padding: 10,
    borderRadius: 10,
  },
  botMessage: {
    textAlign: 'left',
    marginBottom: 5,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  chatIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  chatIcon: {
    width: 80,
    height: 80,
  },
});
