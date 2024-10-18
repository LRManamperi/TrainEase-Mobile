import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingSpinner from '../../components/LoadingScreen'; // Adjust the path to your component
import { ActivityIndicator } from 'react-native';

describe('LoadingSpinner Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinner = getByTestId('loading-spinner'); // Access the spinner using testID
    expect(spinner).toBeTruthy(); // Ensure the spinner is rendered
  });

  it('contains ActivityIndicator with correct properties', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinner = getByTestId('loading-spinner'); // Access the spinner using testID

    // Find the ActivityIndicator within the spinner
    const activityIndicator = spinner.findByType(ActivityIndicator);

    expect(activityIndicator).toBeTruthy(); // Check if ActivityIndicator is present
    expect(activityIndicator.props.size).toBe('large'); // Verify the size property
    expect(activityIndicator.props.color).toBe('#1E2A38'); // Verify the color property
  });
});
