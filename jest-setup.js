// In jest-setup.js

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    console.error.mockRestore();
    jest.runAllTimers(); // Run all pending timers
  jest.useRealTimers(); // Restore real timers
  });
  console.error = jest.fn((message) => {
    if (!message.includes('An update to Animated')) {
      console.error(message);
    }
  });
  // jest.setup.js
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    MaterialIcons: 'MaterialIcons', // Mock MaterialIcons component
  };
});

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

// Optionally, if you're using @react-navigation/native in your tests, you can add this:


// Add other global mocks here, such as axios or any other libraries you use.


