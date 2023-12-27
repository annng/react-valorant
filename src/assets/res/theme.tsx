import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    background: '#191919',
    surface: '#1f1d1d',
    overlay: 'rgba(0,0,0,0.8)',
    overlayLight: 'rgba(255, 255, 255,0.4)',
    onBackground: '#F4F4F4',
    primaryDark: '#D53443',
    onPrimary: '#F4F4F4',
    primary: '#ff4656',
  },
};