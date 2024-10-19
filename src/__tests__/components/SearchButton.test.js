import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';
import SearchButton from '../../components/SearchButton'; 

expect.extend({ toHaveStyle });

describe('SearchButton Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<SearchButton />);
    const buttonText = getByTestId('button-text'); // Access text by testID
    expect(buttonText).toBeTruthy();
  });

  it('has correct styles applied', () => {
    const { getByTestId } = render(<SearchButton />);
    const buttonContainer = getByTestId('button-container');

    // Check styles for the container
    expect(buttonContainer).toHaveStyle({
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      marginTop: 80,
      paddingVertical: 10,
      paddingHorizontal: 70,
      backgroundColor: '#cd3f3e',
    });
    // Check styles for the text
    const buttonText = getByTestId('button-text');
    expect(buttonText).toHaveStyle({
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20,
    });
  });
});
