import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '../../ThemeContext/ThemeProvider';
import Transactions from '../../pages/Transactions';

// Mocking dependencies
jest.mock('axios');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));

describe('Transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    // Mock Redux state to have a logged-in user
    useSelector.mockReturnValue({ currentUser: { id: 'user1' } });

    // Mock theme provider
    useTheme.mockReturnValue({ isDarkMode: false });

    // Mock axios response to delay
    axios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(<Transactions />);

    // Assert that the loading message is shown
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should show error message on fetch failure', async () => {
    // Mock Redux state to have a logged-in user
    useSelector.mockReturnValue({ currentUser: { id: 'user1' } });

    // Mock theme provider
    useTheme.mockReturnValue({ isDarkMode: false });

    // Mock axios to reject with error
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { getByText } = render(<Transactions/>);

    // Wait for error state
    await waitFor(() => {
      expect(getByText('Error loading transactions.')).toBeTruthy();
    });
  });

  it('should render login prompt when no user is logged in', () => {
    // Mock Redux state to have no logged-in user
    useSelector.mockReturnValue({ currentUser: null });

    // Mock theme provider
    useTheme.mockReturnValue({ isDarkMode: false });

    const { getByText } = render(<Transactions/>);

    // Assert that the login message is shown
    expect(getByText('Please log in to see your transactions.')).toBeTruthy();
  });

  it('should display "No transactions available" if no transactions are present', async () => {
    // Mock Redux state to have a logged-in user
    useSelector.mockReturnValue({ currentUser: { id: 'user1' } });

    // Mock theme provider
    useTheme.mockReturnValue({ isDarkMode: false });

    // Mock axios to resolve with no transactions
    axios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(<Transactions/>);

    // Wait for the no transactions message
    await waitFor(() => {
      expect(getByText('No transactions available. Once you make a transaction, it will appear here.')).toBeTruthy();
    });
  });

  it('should display transaction details if transactions are present', async () => {
    // Mock Redux state to have a logged-in user
    useSelector.mockReturnValue({ currentUser: { id: 'user1' } });

    // Mock theme provider
    useTheme.mockReturnValue({ isDarkMode: false });

    // Mock axios to resolve with transaction data
    const transactions = [
      { date: '2024-10-01', totalAmount: 1000, _id: 'booking1' },
    ];
    axios.get.mockResolvedValueOnce({ data: transactions });

    const { getByText } = render(<Transactions/>);

    // Wait for transaction data to be displayed
    await waitFor(() => {
      expect(getByText('Transaction 1')).toBeTruthy();
      expect(getByText('Booking ID: booking1')).toBeTruthy();
      expect(getByText('Date: October 1st 2024')).toBeTruthy();
      expect(getByText('Total Amount: 1000 LKR')).toBeTruthy();
    });
  });
});
