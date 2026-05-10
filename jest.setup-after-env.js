/* eslint-env jest */

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
  ],
}));

jest.mock('@bottom-tabs/react-navigation', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    createNativeBottomTabNavigator: () => {
      function Navigator({ children, initialRouteName = 'Home' }) {
        const kids = React.Children.toArray(children);
        const initial =
          kids.find((c) => c?.props?.name === initialRouteName) || kids[0];
        const Comp = initial?.props?.component;
        return Comp ? (
          <View testID="mock-native-tabs">
            <Comp />
          </View>
        ) : (
          <View testID="mock-native-tabs" />
        );
      }
      function Screen() {
        return null;
      }
      return { Navigator, Screen };
    },
  };
});
