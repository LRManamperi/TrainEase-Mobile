module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|react-clone-referenced-element)'
    ],
  };
  