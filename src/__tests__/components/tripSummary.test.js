import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TripSummary from '../../components/tripSummary'; // Adjust the import path as needed
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('TripSummary Component', () => {
  const mockProps = {
    selectedClass: { name: 'First Class', priceFactor: 1.5 },
    fromStop: {
      departureTime: '2024-10-10T10:00:00Z',
      stationRef: 'fromStationRef',
      price: 100,
    },
    toStop: {
      arrivalTime: '2024-10-10T12:00:00Z',
      stationRef: 'toStationRef',
      price: 200,
    },
    date: '2024-10-10',
    selectedSeatCount: 2,
    trainName: 'Express Train',
    holdTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
    isSuccessful: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Trip Summary correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: { name: 'From Station' } });
    axios.get.mockResolvedValueOnce({ data: { name: 'To Station' } });

    render(<TripSummary {...mockProps} />);

    // Check for title
    expect(screen.getByText('Trip Summary')).toBeTruthy();

    // Check for train name
    expect(screen.getByText(mockProps.trainName)).toBeTruthy();

  

    // Check for remaining time
    expect(screen.getByText(/Your booking will be held for/i)).toBeTruthy();

    // Check for date
    expect(screen.getByText(/Date:/i)).toBeTruthy();

    // Check for class and total seats
    expect(screen.getByText(/Class:/i)).toBeTruthy();
    expect(screen.getByText(/Total Seats:/i)).toBeTruthy();

    // Check total fare calculation
    expect(screen.getByText(/Fare Calculation:/i)).toBeTruthy();
    expect(screen.getByText(/Total:/i)).toBeTruthy();
  });

  it('shows expired message when hold time has passed', async () => {
    const expiredProps = { ...mockProps, holdTime: new Date(Date.now() - 1 * 60 * 1000).toISOString() }; // 1 minute in the past

    render(<TripSummary {...expiredProps} />);

    // Check for expired message
    expect(screen.getByText('Your booking has expired.')).toBeTruthy();
  });
  
  // Add more tests to check for specific functionalities and state changes
});
