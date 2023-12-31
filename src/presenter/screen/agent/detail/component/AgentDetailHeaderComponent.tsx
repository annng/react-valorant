import LinearGradient from "react-native-linear-gradient"
import { Agents } from "../../../../../data/response/Agents"
import { View, ImageBackground, Text, Image, StyleSheet } from "react-native"
import { gradientAgentColor } from "../../../../../core/utils/ext/ColorExt"
import { theme } from "../../../../../assets/res/theme"
import { HeaderBackButton } from "@react-navigation/elements"
import { useNavigation } from "../../../../../core/shared/Routing"

interface AgentDetailHeaderProps {
    agent: Agents
}
const AgentDetailHeaderComponent: React.FC<AgentDetailHeaderProps> = ({ agent }) => {
    const { navigate, pop } = useNavigation()
    return (
        <View style={style.wrapper}>
            <LinearGradient
                // colors={formattedColors}
                // colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', `#${agents.data.backgroundGradientColors[0].substring(0,6)}99`]}
                colors={gradientAgentColor(agent.backgroundGradientColors[0].substring(0, 6))}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={style.header}
            >
                <View style={style.headerBackroundWrapper}>
                    <ImageBackground style={[style.headerBackround]} source={{ uri: agent.fullPortrait }}
                        imageStyle={[style.headerBackgroundAgent, { opacity: 0.2 }]}>
                        <ImageBackground style={style.headerBackround} source={{ uri: agent.background }}
                            tintColor={'rgba(255 255 255 / 0.1)'} imageStyle={style.headerImgBackground}>
                            <View style={style.headerWrapper}>
                                <View style={style.headerAgentWrapper}>
                                    <Text style={style.headerAgentTitle}>{agent.displayName}</Text>
                                    <View style={style.headerWrapperRole}>
                                        <Image source={{ uri: agent.role.displayIcon }} style={style.headerRoleIcon} />
                                        <Text style={style.headerAgentRole}>{agent.role?.displayName}</Text>
                                    </View>
                                </View>
                                <Image style={style.imgThumbnail} source={{ uri: agent.fullPortrait ? agent.fullPortrait : agent.displayIcon }} />
                                <HeaderBackButton onPress={() => pop} />
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </LinearGradient>
            <HeaderBackButton onPress={() => pop()} style={style.backButton} tintColor={theme.colors.onBackground} />

        </View>
    )
}

const style = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 8,
    },
    wrapper: {
        flexGrow: 1,
        height: 200,
        backgroundColor: theme.colors.background
    },
    header: {
        flex: 1,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16
    },
    headerBackroundWrapper: {
        flex: 1
    },
    headerBackround: {
        overflow: 'hidden',
        flex: 1,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16
    },
    headerBackgroundAgent: {
        flex: 1,
        transform: [{ scale: 7 }, { translateY: 60 }, { translateX: -10 }],
        resizeMode: 'contain'
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
    headerWrapperRole: {
        flexDirection: 'row',
        backgroundColor: theme.colors.overlay,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        opacity: 0.7,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    headerRoleIcon: {
        width: 18,
        marginRight: 8,
        height: 18
    },
    headerAgentTitle: {
        fontSize: 24,
        color: theme.colors.onBackground,
        fontWeight: '700',
        marginBottom: 8,
        fontFamily: 'Popppins-Bold'
    },
    headerAgentRole: {
        color: theme.colors.onBackground,
        fontSize: 14,
        alignContent: 'center',
        fontFamily: 'Popppins-Medium',
        textAlign: 'center',
        fontWeight: '400'
    },
    imgThumbnail: {
        width: 200,
    }
})

export default AgentDetailHeaderComponent