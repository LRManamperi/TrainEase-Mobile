import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TrainDetails from '../../pages/trainDetails';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';
import { ThemeProvider } from '../../ThemeContext/ThemeProvider';
import { Alert } from 'react-native';

// Mock the navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));


// Mock the ThemeProvider to control isDarkMode
jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(() => ({ isDarkMode: false })),
}));

describe('TrainDetails Component', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  const mockRoute = {
    params: {
      schedule: { _id: '1', trainRef: { name: 'Express Train' } },
      fromStop: { _id: '1', departureTime: '10:00', price: 50 },
      toStop: { _id: '2', arrivalTime: '12:00', price: 100 },
      date: '2024-12-25',
    },
  };

  it('should render loading indicator while fetching train details', async () => {
    const { getByTestId } = render(
      <TrainDetails route={mockRoute} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render train details after fetching', async () => {
    // Mock API response
    mockAxios.onGet(`${BASE_URL}/api/search/train-details`).reply(200, {
      fromStation: 'Colombo',
      toStation: 'Kandy',
      coachTypes: [{ _id: '1', name: 'First Class', priceFactor: 1.5, available: true, facilities: ['AC', 'Food'] }],
    });

    const { getByText, findByText } = render(
      <TrainDetails route={mockRoute} />
    );

    // Verify if the train details are rendered correctly
    expect(await findByText('Colombo')).toBeTruthy();
    expect(getByText('Kandy')).toBeTruthy();
    expect(getByText('Express Train')).toBeTruthy();
  });

  it('should handle class click and navigate to SeatSelection', async () => {
    const mockNavigate = useNavigation().navigate;

    // Mock API response for train details
    mockAxios.onGet(`${BASE_URL}/api/search/train-details`).reply(200, {
      fromStation: 'Colombo',
      toStation: 'Kandy',
      coachTypes: [{ _id: '1', name: 'First Class', priceFactor: 1.5, available: true, facilities: ['AC', 'Food'] }],
    });

    const { getByText, findByText } = render(
      <TrainDetails route={mockRoute} />
    );

    // Wait for the class option to render
    const classOption = await findByText('First Class');

    // Simulate clicking the class option
    fireEvent.press(classOption);

    // Verify navigation was called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('SeatSelection', {
      selectedClass: { _id: '1', name: 'First Class', priceFactor: 1.5 },
      schedule: mockRoute.params.schedule,
      fromStop: mockRoute.params.fromStop,
      toStop: mockRoute.params.toStop,
      date: mockRoute.params.date,
    });
  });

  it('should show alert if selected class is not available', async () => {
    // Mock API response for train details with a non-available class
    mockAxios.onGet(`${BASE_URL}/api/search/train-details`).reply(200, {
      fromStation: 'Colombo',
      toStation: 'Kandy',
      coachTypes: [{ _id: '1', name: 'First Class', priceFactor: 1.5, available: false, facilities: ['AC', 'Food'] }],
    });

    const { getByText, findByText } = render(
      <TrainDetails route={mockRoute} />
    );

    const classOption = await findByText('First Class');

    // Mock the alert
    jest.spyOn(Alert, 'alert');

    // Simulate pressing on unavailable class
    fireEvent.press(classOption);

    // Check if the alert was shown
    expect(Alert.alert).toHaveBeenCalledWith('This class is not available', 'Please select another class option.');
  });
});
