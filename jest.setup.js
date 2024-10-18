// jest.setup.js
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreAllLogs(true);
require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    TouchableOpacity: jest.fn().mockReturnValue(null),
  };
});
// Suppress all console error logs
const originalError = console.error;

console.error = (...args) => {

// Suppress all console logs
global.console = {
  log: jest.fn(), // Suppress console.log
  warn: jest.fn(), // Suppress console.warn
  error: jest.fn(), // Suppress console.error
  info: jest.fn(), // Suppress console.info
  debug: jest.fn(), // Suppress console.debug
  // Add other console methods as needed
};
// Enable fake timers
jest.useFakeTimers();

// Set a longer timeout for tests
jest.setTimeout(10000);}
