import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function Schedules() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      const { schedules = [], searchParams } = route.params;
      setFrom(searchParams?.from || '');
      setTo(searchParams?.to || '');
      setDate(searchParams?.date || '');
      setSchedules(schedules);
    }
  }, [route.params]);

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get('http://192.168.8.101:3000/api/stations');
        if (response.status === 200) {
          const resStations = response.data.map(station => ({
            label: station.name
          }));
          setStations(resStations);
        } else {
          throw new Error('Failed to fetch stations');
        }
      } catch (error) {
        console.error('Failed to fetch stations:', error);
        Alert.alert('Failed to load stations', error.message);
      }
    }

    fetchStations();
  }, []);

  useEffect(() => {
    if (from && to && date) {
      handleSearch();
    }
  }, [from, to, date]);

  const handleSearch = async () => {
    if (!from || !to || !date) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.get('http://192.168.8.101:3000/api/schedules', {
        params: { fromName: from, toName: to, date: date }
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setSchedules(response.data);
      } else {
        throw new Error('Failed to fetch schedules or invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      Alert.alert('Failed to load schedules', error.message);
    }
  };

  const handleOpen = (fullSchedule) => {
    navigation.navigate('TrainDetails', { 
      schedule: fullSchedule.schedule, 
      fromStop: fullSchedule.fromStop, 
      toStop: fullSchedule.toStop, 
      date 
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleOpen(item)}>
      <View style={styles.row}>
        <View style={styles.trainInfo}>
          <Icon name="train" size={20} color="#000" />
          <Text style={styles.trainName}>{item.schedule?.trainRef?.name || 'Unknown Train'}</Text>
        </View>
        <Text style={styles.time}>
          {item.fromStop?.departureTime} ➔ {item.toStop?.arrivalTime}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>From</Text>
          <Text style={styles.price}>Rs {item.toStop?.price?.toFixed(2) || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {from} <Icon name="arrow-forward" style={styles.arrowIcon} /> {to}
      </Text>
      {schedules.length === 0 ? (
        <Text>No schedules available for the selected route.</Text>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#207497',
    marginHorizontal: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F4F6F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trainName: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
  priceContainer: {
    padding: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 10,
    color: '#666',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
