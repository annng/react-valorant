import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { theme } from "../../../../assets/res/theme";
import { useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreen } from "../../../../core/shared/Routing";
import AgentDetailState from "./AgentDetailState";
import { ResponseData } from "../../../../data/response/ResponseData";
import { Agents } from "../../../../data/response/Agents";
import LinearGradient from "react-native-linear-gradient";
import { gradientAgentColor, gradientColor } from "../../../../core/utils/ext/ColorExt";

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

  return (

    <View style={style.wrapper}>
      {(agents.data != null) && (
        <View>
          <LinearGradient
            // colors={formattedColors}
            // colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', `#${agents.data.backgroundGradientColors[0].substring(0,6)}99`]}
            colors={gradientAgentColor(agents.data.backgroundGradientColors[0].substring(0, 6))}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={style.header}
          >
            <View style={style.headerBackroundWrapper}>
              <ImageBackground style={style.headerBackround} source={{ uri: agents.data.background }} 
              tintColor={'rgba(255 255 255 / 0.1)'} imageStyle={style.headerImgBackground}>
                <View style={style.headerWrapper}>
                  <View style={style.headerAgentWrapper}>
                    <Text style={style.headerAgentTitle}>{agents.data?.displayName}</Text>
                    <Text style={style.headerAgentRole}>{agents.data?.role?.displayName}</Text>
                  </View>
                  <Image style={style.imgThumbnail} source={{ uri: agents.data?.fullPortrait ? agents.data?.fullPortrait : agents.data?.displayIcon }} />
                </View>
              </ImageBackground>
            </View>
          </LinearGradient>
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
    transform: [{rotate: '-35deg'}, {scale : 2}],
    resizeMode : 'cover',
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  headerAgentWrapper: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: theme.colors.overlayLight,
    color: theme.colors.onBackground,
    borderRadius: 4,
    fontWeight: '400',
    opacity: 0.7,
    paddingHorizontal: 8,
    paddingVertical: 6

  },
  imgThumbnail: {
    width: 300,
    flex: 1,
  }
})

export default AgentDetailScreen