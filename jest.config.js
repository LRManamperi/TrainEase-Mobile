module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|react-clone-referenced-element|@expo/vector-icons|react-native-elements|expo-font|expo-notifications|expo|react-native-reanimated|react-redux)'
    ],
  };
  