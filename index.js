/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { store } from './src/core/state/Store'

const RootComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>

    <App />

  </GestureHandlerRootView>
);


AppRegistry.registerComponent(appName, () => RootComponent);
