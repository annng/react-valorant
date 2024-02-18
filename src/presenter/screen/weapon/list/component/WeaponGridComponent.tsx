import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { theme } from "../../../../../assets/res/theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "../../../../../core/shared/Routing"
import { Weapons } from "../../../../../data/response/Weapons"
import LinearGradient from "react-native-linear-gradient"
import mainStyle from "../../../../../utils/styling/mainStyle"

interface WeaponGridProps {
    weapons: Weapons[]
}

const WeaponGridComponent: React.FC<WeaponGridProps> = ({ weapons }) => {
    const { navigate } = useNavigation()

    const [visibleData, setVisibleData] = useState<Weapons[]>([]);

    const _keyExtractor = (item: Weapons, index: number) => {
        return item.uuid.toString();
    }

    const onEndReached = () => {
        // Simulating loading more data on reaching the end

        const newData = weapons ? weapons.slice(visibleData.length, visibleData.length + 10) : [];

        setVisibleData((prevData) => [...prevData, ...newData]);
    };

    useEffect(() => {
        setVisibleData(weapons.slice(0, 10))
    }, [weapons])

    const _renderItem = ({ item }: { item: Weapons }) => {
        const weaponImage = item.displayIcon
        const weaponBackground = item.skins[0].chromas[0].swatch
    
        return (
            <View style={style.wrapper}>
            <TouchableOpacity style={style.container} onPress={() => {
                navigate('WeaponDetail', {
                    uuid : item.uuid,
                    title : item.displayName
                })
            }}>
                 <LinearGradient
                        colors={['rgba(179,59,69,0.8)', 'rgba(179,59,69,0.4)', 'rgba(179,59,69,0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={style.overlay}>
                        {!weaponBackground && weaponBackground != null && (<Image source={{ uri: weaponBackground ?? "" }} style={style.badge} />)}
                        <ImageBackground source={{ uri: weaponImage }} style={style.thumbnail} borderTopLeftRadius={8} borderTopRightRadius={8} resizeMode="contain">
                            <View style={style.weaponInfoContainer}>
                                <Text style={[mainStyle.h4, { marginBottom: 0 }]}>{item.displayName}</Text>
                                <Text style={[style.categoryWeapon]}>{item.category.substring(21)}</Text>
                            </View>
                        </ImageBackground>
                    </LinearGradient>
                    </TouchableOpacity>
                </View >
        )
    }
    return (
        <FlatList
            contentContainerStyle={style.flatContainer}
            data={visibleData}
            numColumns={2}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            onEndReached={onEndReached}
            scrollEnabled={true}
        />

    )
}

const style = StyleSheet.create({
    flatContainer: {
        flex: 1, // the number of columns you want to devide the screen into
        width: '100%',
        height: '100%'
    },
    container: {
        flexGrow: 1,
        padding: 8,
    },
    wrapper: {
        height: 150,
        width: '50%',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 8,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'center'
    },
    badge: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "10%"
    },
    overlay: {
        borderRadius: 8
    },
    weaponInfoContainer: {
        position: "absolute",
        bottom: 8,
        left: 0
    },
    categoryWeapon: {
        fontSize: 14,
        color: theme.colors.primaryDark,
        marginLeft: 8
    }
})

export default WeaponGridComponent