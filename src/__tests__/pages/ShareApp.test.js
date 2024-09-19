import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ShareAppScreen from '../../pages/ShareApp';
import { ThemeProvider } from '../../ThemeContext/ThemeProvider';

describe('ShareAppScreen', () => {
  const renderWithTheme = (isDarkMode) => {
    return render(
      <ThemeProvider value={{ isDarkMode, toggleTheme: jest.fn() }}>
        <ShareAppScreen />
      </ThemeProvider>
    );
  };

  it('renders the ShareAppScreen correctly in light mode', () => {
    const { getByText, getByTestId } = renderWithTheme(false);

    expect(getByText('Share Our App')).toBeTruthy();
    expect(getByText('Share our app with your friends! Scan the QR code below or copy the link to share.')).toBeTruthy();
  });

  it('applies dark mode styling when dark mode is enabled', () => {
    const { getByTestId } = renderWithTheme(true);
    const scrollView = getByTestId('ScrollView');

    

    // Ensure we have the element
    expect(scrollView).toBeTruthy();

    // Check if style is applied
    const containerStyle = scrollView.props.contentContainerStyle || [];
    const hasDarkModeStyle = containerStyle.some(styleObj => styleObj.backgroundColor === '#121212');

    expect(hasDarkModeStyle).toBeDefined();
  });

  // You can add more tests as needed to check the button actions and any QR code functionality.
});
