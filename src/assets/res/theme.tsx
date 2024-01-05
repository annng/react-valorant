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
    onSurface: '#f1f1f1',
    overlay: 'rgba(0,0,0,0.8)',
    overlayLight: 'rgba(255, 255, 255,0.4)',
    onBackground: '#F4F4F4',
    paragraph : '#9a9a9a',
    primaryDark: '#D53443',
    onPrimary: '#F4F4F4',
    title : '#A69292',
    secondary : "#afff46",
    accent : "#0d1322",
    accentLight : '#c6d4f7',
    primary: '#ff4656',
    primaryTransparent: "rgba(255,70,86,0.4)"
  },
};