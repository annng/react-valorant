import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type stackScreen = {
  Home: undefined;
  AgentDetail: { uuid: string | null, title : string };
};

// export type HomeNavigationProp = StackNavigationProp<stackScreen, 'Home'>;
// export type HomeRouteProp = RouteProp<stackScreen, 'ScreenA'>;

// export type AgentDetailNavigationProp = StackNavigationProp<stackScreen, 'AgentDetail'>;
// export type AgentDetailRouteProp = RouteProp<stackScreen, 'ScreenB'>;

