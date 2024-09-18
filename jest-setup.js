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
