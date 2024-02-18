/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/presenter/screen/home';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/assets/res/theme';
import { LogoImage } from './src/utils/component/MyAppBar';
import AgentDetailScreen from './src/presenter/screen/agent/detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackScreen } from './src/core/shared/Routing';
import { createStackNavigator } from '@react-navigation/stack';
import AgentListScreen from './src/presenter/screen/agent/list';
import MapDetailScreen from './src/presenter/screen/map/detail';
import ZoomableImage from './src/utils/component/ZoomableImage';
import MapListScreen from './src/presenter/screen/map/list';
import WeaponDetailScreen from './src/presenter/screen/weapon/detail';
import { Provider } from 'react-redux';
import { store } from './src/core/state/Store';
import WeaponListScreen from './src/presenter/screen/weapon/list';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  const Stack = createNativeStackNavigator<stackScreen>();
  // const Stack = createStackNavigator<stackScreen>();


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
          // <Stack.Navigator initialRouteName='WeaponDetail' screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerShadowVisible: false,
            headerTintColor: theme.colors.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: (props) => <LogoImage /> }} />
            <Stack.Screen name='AgentList' component={AgentListScreen} options={{ headerShown: true, headerTitle: "Agents" }} />
            <Stack.Screen name='AgentDetail' component={AgentDetailScreen} options={{ headerShown: false }} initialParams={
              {
                uuid: "e370fa57-4757-3604-3648-499e1f642d3f",
                title: "Gecko"
              }
            } />
            <Stack.Screen name='MapList' component={MapListScreen} options={{ headerShown: true, headerTitle: "Maps" }} />
            <Stack.Screen name='WeaponList' component={WeaponListScreen} options={{ headerShown: true, headerTitle: "Weapon" }} />
            <Stack.Screen name='MapDetail' component={MapDetailScreen} options={{ headerShown: false }} initialParams={
              {
                uuid: "92584fbe-486a-b1b2-9faa-39b0f486b498",
                title: "Sunset"
              }
            } />
            <Stack.Screen name='WeaponDetail' component={WeaponDetailScreen} options={{ headerShown: false }} initialParams={
              {
                uuid: "63e6c2b6-4a8e-869c-3d4c-e38355226584",
                title: "Odin"
              }
            } />

            <Stack.Screen name='ZoomImage' component={ZoomableImage} options={{ headerShown: false }} initialParams={
              {
                url: "https://www.cnet.com/a/img/resize/8bc1fe51f38b84a7ee99cae6d2cdee3709c6db9d/hub/2021/09/02/1511ef05-2457-4272-918d-6719d4897e65/beta-key-art-valorant.jpg?auto=webp&fit=crop&height=675&width=1200"
              }
            } />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;


