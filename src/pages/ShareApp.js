import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
// import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
// import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../ThemeContext/ThemeProvider';

export default function ShareAppScreen() {
//   const [appLink, setAppLink] = useState('https://example.com/your-app-download'); 
const { isDarkMode, toggleTheme } = useTheme();

//   const handleCopyToClipboard = async () => {
//     try {
//       await Clipboard.setStringAsync(appLink);
//       Alert.alert('Copied to Clipboard', 'App link has been copied to clipboard.');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to copy the app link. Please try again.');
//     }
//   };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <MaterialIcons name="share" size={24} color="gray" style={styles.icon} />
        <Text style={styles.headerText}>Share Our App</Text>
      </View>

      <Text style={styles.descriptionText}>
        Share our app with your friends! Scan the QR code below or copy the link to share.
      </Text>

      {/* <View style={styles.qrCodeContainer}>
        <QRCode
          value={appLink}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View> */}

      {/* <Text style={styles.appLink}>{appLink}</Text> */}

      {/* <Button
        mode="contained"
        onPress={handleCopyToClipboard}
        style={styles.copyButton}
      >
        Copy App Link
      </Button> */}
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
  descriptionText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: 'gray',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appLink: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
    color: '#CD3F3E', // Matching the theme
  },
  copyButton: {
    paddingVertical: 10,
    backgroundColor: '#CD3F3E', // Matching the theme
    borderRadius: 5,
    alignSelf: 'center',
  },
  darkText: {
    color: '#fff',
  },
});
