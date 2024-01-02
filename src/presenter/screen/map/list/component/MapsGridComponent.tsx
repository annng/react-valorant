import { FlatList, Image, StyleSheet, Text, Touchable, View } from "react-native"
import { MapGame } from "../../../../../data/response/MapGame"
import { useEffect, useState } from "react"
import { Agents } from "../../../../../data/response/Agents"
import mainStyle from "../../../../../utils/styling/mainStyle"
import { theme } from "../../../../../assets/res/theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "../../../../../core/shared/Routing"

interface MapsGridProps {
    maps: MapGame[]
}

const MapsGridComponent: React.FC<MapsGridProps> = ({ maps }) => {
    const { navigate } = useNavigation()

    const [visibleData, setVisibleData] = useState<MapGame[]>([]);

    const _keyExtractor = (item: MapGame, index: number) => {
        return item.uuid.toString();
    }

    const onEndReached = () => {
        // Simulating loading more data on reaching the end

        const newData = maps ? maps.slice(visibleData.length, visibleData.length + 6) : [];

        setVisibleData((prevData) => [...prevData, ...newData]);
    };

    useEffect(() => {
        setVisibleData(maps.slice(0, 6))
    }, [maps])

    const _renderItem = ({ item }: { item: MapGame }) => {

        const callSign = item.mapUrl.split("/")
        return (
            <TouchableOpacity style={style.container} onPress={() => {
                navigate('MapDetail', {
                    uuid : item.uuid,
                    title : item.displayName
                })
            }}>
                <View style={style.wrapper}>
                    <View style={style.wrapperThumbnail}>
                        <Image source={{ uri: item.splash }} style={style.imgThumbnail} />
                        {item.displayIcon != null && (<Image source={{ uri: item.displayIcon }} style={style.imgSite} />)}
                    </View>
                    <View style={style.wrapperInfo}>
                        <Text style={[mainStyle.h4, { marginLeft: 0 }]}>{item.displayName} // {callSign[callSign.length - 1]}</Text>
                        <Text style={[mainStyle.p, style.textCoordinate]}>{item.coordinates}</Text>
                        {item.narrativeDescription != null && (<Text style={[mainStyle.caption, { marginBottom: 8, flex: 1 }]} numberOfLines={2} ellipsizeMode="tail">{
                            item.narrativeDescription}
                        </Text>)}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            contentContainerStyle={style.flatContainer}
            data={visibleData}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            onEndReached={onEndReached}
            scrollEnabled={true}
        />

    )
}

const style = StyleSheet.create({
    flatContainer: {
        flexGrow: 1,
        paddingTop: 10,
        alignContent: 'space-between'
    },
    container: {
        flexGrow: 1,
        padding: 8,
    },
    wrapper: {
        flexGrow: 1,
        borderRadius: 16,
        backgroundColor: theme.colors.surface
    },
    wrapperThumbnail: {
        flex: 1
    },
    imgSite: {
        height: 75,
        position: 'absolute',
        right : 8,
        width: 75,
        top : 8
    },
    imgThumbnail: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flex: 1,
        height: 150
    },
    wrapperInfo: {
        flexGrow: 1,
        padding: 10,
    },
    textCoordinate: {
        color: theme.colors.title,
        fontWeight: '500'
    }
})

export default MapsGridComponent