import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { Card, Divider, Title, Paragraph, IconButton } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getTimeDiffInMins from '../utils/timeDuration'; // Adjust the import path as needed

const TripSummary = ({
  selectedClass,
  fromStop,
  toStop,
  date,
  selectedSeatCount,
  trainName,
  holdTime,
  isSuccessful,
}) => {
  const [remainingTime, setRemainingTime] = useState('');
  const [fromStopName, setFromStopName] = useState('');
  const [toStopName, setToStopName] = useState('');

  useEffect(() => {
    const fetchStops = async () => {
      try {
        if (!fromStop || !fromStop.stationRef || !toStop || !toStop.stationRef) {
          console.error('Station reference is undefined');
          return;
        }

        const fromStopResponse = await axios.get(`/api/stationName/${fromStop.stationRef}`);
        const toStopResponse = await axios.get(`/api/stationName/${toStop.stationRef}`);
        
        setFromStopName(fromStopResponse.data.name);
        setToStopName(toStopResponse.data.name);
      } catch (error) {
        console.error('Failed to fetch stops:', error);
      }
    };

    fetchStops();
  }, [fromStop, toStop]);

  useEffect(() => {
    const countdown = () => {
      const endTime = new Date(holdTime).getTime();
      const now = new Date().getTime();
      const timeLeft = endTime - now;
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      setRemainingTime(`${minutes} minutes ${seconds} seconds`);
      if (timeLeft < 0) {
        clearInterval(interval);
        setRemainingTime('Expired');
      }
    };

    const interval = setInterval(countdown, 1000);
    countdown();
    return () => clearInterval(interval);
  }, [holdTime]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Trip Summary" titleStyle={styles.title} />
        <Divider style={styles.divider} />
        <Card.Content>
          <View style={styles.trainNameContainer}>
            <IconButton icon="train" size={30} />
            <Title style={styles.trainName}>{trainName}</Title>
          </View>
          <View style={styles.stopsContainer}>
            <View style={styles.stop}>
              <Text style={styles.time}>{fromStop.departureTime}</Text>
              <Icon name="location-on" color="#207497" size={20} />
              <Paragraph>{fromStopName}</Paragraph>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View style={styles.stop}>
              <Text style={styles.time}>{toStop.arrivalTime}</Text>
              <Icon name="location-on" color="#D32F2F" size={20} />
              <Paragraph>{toStopName}</Paragraph>
            </View>
          </View>
          {!isSuccessful && holdTime && (
            <Paragraph style={styles.remainingTime} color="#D32F2F">
              {remainingTime !== 'Expired'
                ? `Your booking will be held for ${remainingTime}.`
                : 'Your booking has expired.'}
            </Paragraph>
          )}
          <View style={styles.summaryContainer}>
            <Paragraph>
              <Text style={styles.label}>Date: </Text>
              {date}
            </Paragraph>
            <Paragraph>
              <Text style={styles.label}>Journey Duration: </Text>
              {getTimeDiffInMins(fromStop.departureTime, toStop.arrivalTime)}
            </Paragraph>
            <Divider style={styles.divider} />
            <Paragraph>
              <Text style={styles.label}>Class: </Text>
              <Text style={styles.highlightedText}>{selectedClass.name}</Text>
            </Paragraph>
            <Paragraph>
              <Text style={styles.label}>Total Seats: </Text>
              <Text style={styles.highlightedText}>{selectedSeatCount}</Text>
            </Paragraph>
            <Paragraph>
              <Text style={styles.label}>Fare Calculation: </Text>
              <Text style={styles.highlightedText}>
                {selectedClass.priceFactor * (toStop.price - fromStop.price)} x{' '}
                {selectedSeatCount}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text style={styles.label}>Total: </Text>
              <Text style={styles.highlightedText}>
                LKR{' '}
                {selectedSeatCount * selectedClass.priceFactor * (toStop.price - fromStop.price)}
              </Text>
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 16,
  },
  trainNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  trainName: {
    fontSize: 20,
  },
  stopsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stop: {
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalDivider: {
    height: 2,
    flex: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
  },
  remainingTime: {
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryContainer: {
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  highlightedText: {
    color: '#207497',
    fontWeight: 'bold',
  },
  startLocationIcon: {
    fontSize: 24,
    color: "#207497",
    marginRight: 10,
  },
  endLocationIcon: {
    fontSize: 24,
    color: "#D32F2F",
    marginRight: 10,
  },
  Button: {
    backgroundColor: '#D9534F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',    
  },
  ButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TripSummary;
