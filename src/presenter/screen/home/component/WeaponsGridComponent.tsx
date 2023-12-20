import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { Weapons } from "../../../../data/response/Weapons"
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../../../assets/res/theme";
import mainStyle from "../../../../utils/styling/mainStyle";

interface WeaponsGridProps {
    items?: Weapons[] | null,
    style?: Object
}




const WeaponsGridComponent: React.FC<WeaponsGridProps> = (props) => {

    const [visibleData, setVisibleData] = useState<Weapons[]>([]);


    const _keyExtractor = (item: Weapons, index: number) => {
        return item.uuid.toString();
    }

    const onEndReached = () => {
        // Simulating loading more data on reaching the end
        
        const newData = props.items ? props.items.slice(visibleData.length, visibleData.length + 2) : [];
        setVisibleData((prevData) => [...prevData, ...newData]);
    };

    const _renderItem = ({ item }: { item: Weapons }) => {
        const weaponImage = item.skins[0].chromas ? item.skins[0].chromas[0].fullRender : item.displayIcon
        const weaponBackground = item.skins[0].chromas[0].swatch
        return (
            <View style={style.wrapper}>
                <LinearGradient
                    colors={['rgba(179,59,69,0.8)', 'rgba(179,59,69,0.4)', 'rgba(179,59,69,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={style.overlay}>
                        {!weaponBackground && weaponBackground != null && (<Image source={{uri : weaponBackground ?? ""}} style={style.badge}/>)}
                    <ImageBackground source={{ uri: weaponImage }} style={style.thumbnail} borderTopLeftRadius={8} borderTopRightRadius={8} resizeMode="contain">
                        <View style={style.weaponInfoContainer}>
                        <Text style={[mainStyle.h4, {marginBottom: 0}]}>{item.displayName}</Text>
                        <Text style={[style.categoryWeapon]}>{item.category.substring(21)}</Text>
                    </View>
                </ImageBackground>
            </LinearGradient>


            </View >
        )
    }

return (
    <FlatList style={[props.style]}
        data={props.items}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        horizontal={false}
        numColumns={2}
        scrollEnabled={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
    />
)
}

const style = StyleSheet.create({
    wrapper: {
        height: 150,
        flex: 2,
        maxWidth: "50%",
        margin: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.surface
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'center'
    },
    badge:{
        position: "absolute",
        top: 0,
        left: 0,
        width:"10%"
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

export default WeaponsGridComponent