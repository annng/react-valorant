import React, { useEffect, useState } from 'react'
import { Agents } from '../../../../../data/response/Agents'
import { FlatList } from 'react-native-gesture-handler'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../../../../../assets/res/theme'
import LinearGradient from 'react-native-linear-gradient'
import EllipsisText from '../../../../../utils/component/EllipsizeText'

interface AgentsGridProps {
    agents: Agents[]
    navigation: any
}
const AgentsGridComponent: React.FC<AgentsGridProps> = ({ agents, navigation }) => {

    const [visibleData, setVisibleData] = useState<Agents[]>([]);

    const _keyExtractor = (item: Agents, index: number) => {
        return item.uuid.toString();
    }

    const onEndReached = () => {
        // Simulating loading more data on reaching the end

        const newData = agents ? agents.slice(visibleData.length, visibleData.length + 6) : [];
        setVisibleData((prevData) => [...prevData, ...newData]);
    };

    const _renderItem = ({ item }: { item: Agents }) => {

        const formattedColors = item.backgroundGradientColors.map(color => `#${color}`);

        const numColumns = 2;
        const screenWidth = Dimensions.get('window').width;
        const itemWidth = (screenWidth / numColumns) - 8;

        return (
            <TouchableOpacity onPress={() => {
                navigation.push("AgentDetail", {
                    uuid: item.uuid,
                    title: item.displayName
                });
            }}>
                <LinearGradient
                    // colors={formattedColors}
                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', formattedColors[0]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[CardAgent.wrapper, { width: itemWidth }]}
                >
                    {
                        item.background != null && <Image source={{ uri: item.background }} style={CardAgent.backgroundContent} />
                    }

                    <View style={[CardAgent.content]}>


                        <View style={CardAgent.containerAlias}>
                            <Text style={CardAgent.title}>{item.displayName}</Text>
                            {item.role.displayName != null && (<View style={CardAgent.alias}>
                                <Text ellipsizeMode='tail' numberOfLines={1} style={CardAgent.aliasText}> {item.role.displayName} </Text></View>
                            )}
                        </View>

                        <Image source={{ uri: item.fullPortrait ? item.fullPortraitV2 : item.displayIcon }} style={CardAgent.thumbnail} />

                    </View>

                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        
            <FlatList
                data={agents}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                numColumns={2}
                scrollEnabled={true}
            />
        
    )
}

const CardAgent = StyleSheet.create({
    app: {
        flex: 2, // the number of columns you want to devide the screen into
        width: '100%',
        height: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    wrapper: {
        height: 150,
        flex: 1,
        width: 'auto',
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.surface
    },
    content: {
        flex: 1,
        width:'100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 8
    },
    backgroundContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    thumbnail: {  
        position: 'relative',
        top: 0,
        bottom: 0,
        zIndex: 5,
        height: '100%',
        resizeMode: 'contain',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    title: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.onBackground
    },
    containerAlias: {
        position: 'absolute',
        width: '100%',
        flex: 1,
        flexGrow: 1,
        zIndex: 10,
        display: 'flex',
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
        minHeight: 24,
        justifyContent: 'center',
        backgroundColor: theme.colors.primaryTransparent,
        color: theme.colors.onPrimary,
        paddingHorizontal: 8,
        marginTop: 8,
        paddingVertical: 4,

    },
    aliasText: {
        color: theme.colors.onPrimary,
        fontWeight: '700',
        fontSize: 10
    },
})

export default AgentsGridComponent