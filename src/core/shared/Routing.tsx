import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigation as useReactNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
export type stackScreen = {
  Home: undefined;
  AgentDetail: { uuid: string | null, title : string };
  MapDetail: { uuid: string | null, title : string };
  AgentList : undefined
  ZoomImage : {url : string}
};

export const useNavigation = () => {
  return useReactNavigation<NativeStackNavigationProp<stackScreen>>();
};
// export type HomeNavigationProp = StackNavigationProp<stackScreen, 'Home'>;
// export type HomeRouteProp = RouteProp<stackScreen, 'ScreenA'>;

// export type AgentDetailNavigationProp = StackNavigationProp<stackScreen, 'AgentDetail'>;
// export type AgentDetailRouteProp = RouteProp<stackScreen, 'ScreenB'>;

