import React, { useRef, useState } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { Chroma } from '../../../../../../data/response/Weapons'
import { useNavigation } from '../../../../../../core/shared/Routing'
import { theme } from '../../../../../../assets/res/theme'
import mainStyle from '../../../../../../utils/styling/mainStyle'
import RBSheet from '@nonam4/react-native-bottom-sheet'



interface WeaponSkinTypeProps {
    skins: Chroma[],
    refSheet : React.MutableRefObject<RBSheet | null>
}

export const WeaponSkinTypeComponent: React.FC<WeaponSkinTypeProps> = ({ skins, refSheet }) => {

    const [selectedChroma, setSelectedChroma] = useState<Chroma | null>(null)

    const { navigate } = useNavigation()

    const _keyExtractor = (item: Chroma, index: number) => {
        return item.uuid.toString();
    }

    const _selectSkin = (skin: Chroma) => {
        refSheet.current?.close()
        setTimeout(() => {
            navigate("ZoomImage", { url: skin.fullRender })
        }, 400);

    }

    const _renderItem = ({ item }: { item: Chroma }) => {
        return (

            <View style={style.wrapper}>
                <TouchableOpacity onPress={() => {

                    _selectSkin(item)
                }} style={{ width: '100%', height: 150 }}>
                    <LinearGradient
                        // colors={['#161f36', '#0d1322', 'rgba(179,59,69,0)']}
                        colors={[theme.colors.overlayLight, theme.colors.primaryTransparent, theme.colors.surface]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={style.overlay}>
                        {/* <Image source={{ uri: item.displayIcon ?? "" }} style={style.badge} /> */}
                        {item.fullRender != null && (<ImageBackground source={{ uri: item.fullRender }} style={style.thumbnailContainer}
                            imageStyle={style.thumbnail} resizeMode="contain">
                            <View style={style.weaponInfoContainer}>
                                <Text style={[mainStyle.caption, { marginBottom: 16, marginLeft: 8 }]} numberOfLines={2} ellipsizeMode='tail'>{item.displayName}</Text>
                            </View>
                        </ImageBackground>)}

                    </LinearGradient>
                </TouchableOpacity>
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

export default WeaponSkinTypeComponent