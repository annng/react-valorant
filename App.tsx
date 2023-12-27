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



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  const Stack = createNativeStackNavigator<stackScreen>();
  // const Stack = createStackNavigator<stackScreen>();


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName='Home' screenOptions={{ */}
          <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: (props) => <LogoImage/> }} />
          <Stack.Screen name='AgentDetail' component={AgentDetailScreen} options={{headerShown: false}} initialParams={
            {
              uuid : "e370fa57-4757-3604-3648-499e1f642d3f",
              title : "Gecko"
            }
          }/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;


