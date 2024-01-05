import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Skin, Weapons } from '../../../../../data/response/Weapons'
import { useNavigation } from '../../../../../core/shared/Routing'
import { MapGame } from '../../../../../data/response/MapGame'
import { theme } from '../../../../../assets/res/theme'
import LinearGradient from 'react-native-linear-gradient'
import mainStyle from '../../../../../utils/styling/mainStyle'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkin } from '../WeaponSkinSlice'
import { RootState } from '../../../../../core/state/Store'
import RBSheet from '@nonam4/react-native-bottom-sheet'


interface WeaponSkinProps {
    skins: Skin[]
}

export const WeaponSkinComponent: React.FC<WeaponSkinProps> = ({ skins }) => {

    const dispatch = useDispatch();
    const selectedSkin = useSelector((state: RootState) => state.weaponSkin.value);

    const refRBSheet = useRef<RBSheet | null>(null);


    const { navigate } = useNavigation()

    const _keyExtractor = (item: Skin, index: number) => {
        return item.uuid.toString();
    }

    const _selectSkin = (skin: Skin) => {
        if (selectedSkin == skin) {
            dispatch(selectSkin(null));
        } else {
            dispatch(selectSkin(skin));
        }
    }

    const _renderItem = ({ item }: { item: Skin }) => {

        const hasStreamedVideo = item.levels.some(level => level.streamedVideo !== null);


        return (

            <View style={style.wrapper}>
                <TouchableOpacity onPress={() => _selectSkin(item)} style={{ width: '100%', height: 150 }}>
                    <LinearGradient
                        colors={['#161f36', '#0d1322', 'rgba(179,59,69,0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={style.overlay}>
                        {/* <Image source={{ uri: item.displayIcon ?? "" }} style={style.badge} /> */}
                        {item.displayIcon != null && (<ImageBackground source={{ uri: item.displayIcon }} style={style.thumbnailContainer}
                            imageStyle={style.thumbnail} resizeMode="contain">
                            <View style={style.weaponInfoContainer}>
                                <Text style={[mainStyle.h4, {
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }]} numberOfLines={1} ellipsizeMode='tail'>{item.displayName}</Text>
                                <View style={style.wrapperSkin}>
                                    <Text style={[mainStyle.p, {}]}>{item.chromas.length} Type Skin</Text>
                                    {hasStreamedVideo && (
                                        <TouchableOpacity onPress={() => {
                                        }} style={{ flex: 1, }}>
                                            <Text style={[mainStyle.p, { color: theme.colors.primary, fontWeight: 'bold', textAlign: 'right' }]}>See Video</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </ImageBackground>)}

                    </LinearGradient>
                </TouchableOpacity>
            </View >

        )
    }

    return (
        <View>
            <FlatList
                contentContainerStyle={style.app}
                data={skins}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                numColumns={2}
                scrollEnabled={false}
            />
        </View>
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
    overlay: {
        borderRadius: 8,
        flex: 1,
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    wrapperSkin: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        marginHorizontal: 10,
    },
    categoryWeapon: {
        fontSize: 14,
        color: theme.colors.primaryDark,
        marginLeft: 8
    }
})

export default WeaponSkinComponent
