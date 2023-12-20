import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Agents } from "../../../../data/response/Agents";
import { theme } from "../../../../assets/res/theme";
import LinearGradient from "react-native-linear-gradient";
import EllipsisText from "../../../../utils/component/EllipsizeText";


interface AgentListProps {
    items?: Agents[] | null,
    style?: Object;
    navigation: any
}


const AgentListComponent: React.FC<AgentListProps> = (props) => {


    const _keyExtractor = (item: Agents, index: number) => {
        // Your key extraction logic
        return item.uuid.toString(); // Replace with your actual key extraction logic
    }


    const _renderItem = ({ item }: { item: Agents }) => {
        // Your renderItem logic
        const formattedColors = item.backgroundGradientColors.map(color => `#${color}`);

        return (
            <TouchableOpacity onPress={() => {
                props.navigation.push("AgentDetail", {
                    uuid: item.uuid,
                    title: item.displayName
                });
            }}>
                <LinearGradient
                    // colors={formattedColors}
                    colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', formattedColors[0]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={CardAgent.wrapper}
                >


                    {
                        item.background != null && <Image source={{ uri: item.background }} style={CardAgent.backgroundContent} />
                    }

                    <View style={[CardAgent.content]}>

                        <View style={CardAgent.containerAlias}>
                            <Text style={CardAgent.title}>{item.displayName}</Text>
                            {item.characterTags != null && item.characterTags.length > 0 && (<View style={CardAgent.alias}><EllipsisText text={item.characterTags[0]} maxLength={10} style={CardAgent.aliasText} /></View>
                            )}
                        </View>

                        <Image source={{ uri: item.fullPortrait ? item.fullPortrait : item.displayIcon }} style={CardAgent.thumbnail} />

                    </View>

                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList style={[props.style]}
            data={props.items}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            horizontal={true}
        />
    )
}

const CardAgent = StyleSheet.create({
    wrapper: {
        margin: 5,
        width: 200,
        // height: '100%',
        // maxHeight: 300,
        flexBasis: 'auto',
        borderRadius: 8
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    backgroundContent: {
        position: 'relative',
        top: 0,
        left: 0,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    thumbnail: {
        width: '100%',
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    title: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        color: theme.colors.onBackground
    },
    containerAlias: {
        position: 'relative',
        top: 4,
        left: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 4,
        paddingTop: 4,
        marginHorizontal: 4
    },
    alias: {
        display: 'flex',
        borderRadius: 18,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
        paddingHorizontal: 8,
        marginRight: 16,
        paddingVertical: 4,

    },
    aliasText: {
        color: theme.colors.onPrimary,
        fontWeight: '700',
        fontSize: 10
    },
})

export default AgentListComponent