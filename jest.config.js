const reactNativeJestPreset = require('@react-native/jest-preset');

module.exports = {
  ...reactNativeJestPreset,
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/cssMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    ...reactNativeJestPreset.moduleNameMapper,
  },
  setupFiles: [
    ...reactNativeJestPreset.setupFiles,
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|nativewind|react-native-css-interop)/)',
  ],
};
