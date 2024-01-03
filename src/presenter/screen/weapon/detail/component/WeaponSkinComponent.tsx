import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Skin } from '../../../../../data/response/Weapons'
import { useNavigation } from '../../../../../core/shared/Routing'
import { MapGame } from '../../../../../data/response/MapGame'
import { theme } from '../../../../../assets/res/theme'
import LinearGradient from 'react-native-linear-gradient'
import mainStyle from '../../../../../utils/styling/mainStyle'

interface WeaponSkinProps {
    skins: Skin[]
}

export const WeaponSkinComponent: React.FC<WeaponSkinProps> = ({ skins }) => {

    const { navigate } = useNavigation()

    const _keyExtractor = (item: Skin, index: number) => {
        return item.uuid.toString();
    }

    const _renderItem = ({ item }: { item: Skin }) => {
        return (
            <View style={style.wrapper}>
                <LinearGradient
                    colors={['rgba(179,59,69,0.8)', 'rgba(179,59,69,0.4)', 'rgba(179,59,69,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={style.overlay}>
                    {/* <Image source={{ uri: item.displayIcon ?? "" }} style={style.badge} /> */}
                    {item.displayIcon != null && (<ImageBackground source={{ uri: item.displayIcon }} style={style.thumbnailContainer} 
                    imageStyle={style.thumbnail} resizeMode="contain">
                        <View style={style.weaponInfoContainer}>
                            <Text style={[mainStyle.h4, { marginBottom: 0 }]}>{item.displayName}</Text>
                        </View>
                    </ImageBackground>)}

                </LinearGradient>
            </View >
        )
    }

    return (
        <FlatList
            contentContainerStyle={style.app}
            data={skins}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            numColumns={2}
            scrollEnabled={false}
        />
    )
}

const style = StyleSheet.create({
    app: {
        flex: 1, // the number of columns you want to devide the screen into
        width: '100%',
        height: '100%',
    },
    wrapper: {
        height: 150,
        width: '50%',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 8
    },
    overlay: {
        borderRadius: 8,
        flex: 1,
    },
    badge: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "10%"
    },
    thumbnailContainer: {
        width: '100%',
        height: '100%',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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

export default WeaponSkinComponent
