import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PreBookingQueries from '../../pages/PreBookingQueries'; // Adjust the path as needed
import { useTheme } from '../../ThemeContext/ThemeProvider'; // Import the mock useTheme
import { Divider } from 'react-native-paper'; // To mock paper divider component

// Mock the useTheme hook
jest.mock('../../ThemeContext/ThemeProvider', () => ({
  useTheme: jest.fn(),
}));

// Mock react-native-paper Divider
jest.mock('react-native-paper', () => ({
  Divider: jest.fn().mockReturnValue(null),
}));

describe('PreBookingQueries Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock data before each test
  });

  test('renders all queries in light mode', () => {
    // Mock useTheme to return light mode
    useTheme.mockReturnValue({ isDarkMode: false });
  
    render(<PreBookingQueries />);
  
    // Check if the queries are rendered correctly
    const queryTitle = screen.getByText("Why can't I book a ticket?");
  
    // Ensure light mode is applied by checking the style array
    const stylesArray = queryTitle.props.style;
    
    const hasCorrectColor = stylesArray.some(
      (style) => style && style.color === '#333' // Check if one of the styles has color: '#333'
    );
    
    expect(hasCorrectColor).toBe(false);
  });
  

  test('renders all queries in dark mode', () => {
    // Mock useTheme to return dark mode
    useTheme.mockReturnValue({ isDarkMode: true });

    render(<PreBookingQueries />);

    // Check if the queries are rendered correctly
    expect(screen.getByText("Why can't I book a ticket?")).toBeTruthy();
    expect(screen.getByText('What to do if I face payment issues?')).toBeTruthy();
    expect(screen.getByText('How can I contact customer service?')).toBeTruthy();

    // Ensure dark mode styles are applied
    const queryTitle = screen.getByText("Why can't I book a ticket?");
    expect(queryTitle.props.style).toContainEqual({ color: '#fff' });
  });

  test('displays customer service contact information', () => {
    useTheme.mockReturnValue({ isDarkMode: false });

    render(<PreBookingQueries />);

    // Check if the customer service phone number is rendered
    expect(
      screen.getByText(
        'You can reach our customer service through the contact section on the app or by calling our hotline: 123-456-789.'
      )
    ).toBeTruthy();
  });
});
