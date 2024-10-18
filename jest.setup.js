// jest.setup.js
require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    TouchableOpacity: jest.fn().mockReturnValue(null),
  };
});
