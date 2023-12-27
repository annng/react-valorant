import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Animated, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { theme } from "../../../../assets/res/theme";
import { useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreen } from "../../../../core/shared/Routing";
import AgentDetailState from "./AgentDetailState";
import { ResponseData } from "../../../../data/response/ResponseData";
import { Agents } from "../../../../data/response/Agents";
import LinearGradient from "react-native-linear-gradient";
import { gradientAgentColor, gradientColor } from "../../../../core/utils/ext/ColorExt";
import AgentDetailHeaderComponent from "./component/AgentDetailHeaderComponent";
import AgentDetailInformationComponent from "./component/AgentDetailInformationComponent";
import AgentAbilitiesComponent from "./component/AgentAbilitiesComponent";
import { ScrollView } from "react-native-gesture-handler";

type AgentDetailProps = NativeStackScreenProps<stackScreen, 'AgentDetail'>

const AgentDetailScreen: React.FC<AgentDetailProps> = ({ navigation, route }: AgentDetailProps) => {

  const agentDetailState = AgentDetailState()

  const { uuid, title } = route.params
  useNavigation<NativeStackNavigationProp<stackScreen>>()


  const agents: ResponseData<Agents> = agentDetailState.agents

  useEffect(() => {
    const fetchData = async () => {
      if (uuid != null) {
        await agentDetailState.fetchAgent(uuid);
      } else {
        navigation.pop();
      }
    };

    fetchData();
  }, [uuid, navigation])

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });

  }, [title, navigation])

  //Scroll
  const scrollY = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Set to true if using native driver is possible
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });



  return (

    <View style={style.wrapper}>
      {(agents.data != null) && (
        <View style={style.wrapper}>
          <AgentDetailHeaderComponent agent={agents.data} navigation={navigation} />
          <ScrollView onScroll={handleScroll}>
            <View style={{ flex: 1 }}>
              <AgentDetailInformationComponent agent={agents.data} navigation={navigation} />
              <AgentAbilitiesComponent abilities={agents.data?.abilities} />
            </View>
          </ScrollView>
        </View>
      )}
    </View>

  )

}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    width: '100%',
    height: 200,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16
  },
  headerBackroundWrapper: {
    flex: 1
  },
  headerBackround: {
    overflow: 'hidden',
    flex: 1,
  },
  headerImgBackground: {
    overflow: 'hidden',
    transform: [{ rotate: '-35deg' }, { scale: 2 }],
    resizeMode: 'cover',
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerAgentWrapper: {
    paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  headerAgentTitle: {
    fontSize: 24,
    color: theme.colors.onBackground,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Popppins-Bold'
  },
  headerAgentRole: {
    fontSize: 14,
    backgroundColor: theme.colors.overlay,
    color: theme.colors.onBackground,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.7,
    paddingHorizontal: 8,
    paddingVertical: 6

  },
  imgThumbnail: {
    width: 200,
  }
})

export default AgentDetailScreen