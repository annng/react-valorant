import React, { useEffect, useRef } from 'react'
import { Skin } from '../../../../../../data/response/Weapons'
import RBSheet from '@nonam4/react-native-bottom-sheet'
import { theme } from '../../../../../../assets/res/theme'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { selectSkin } from '../../WeaponSkinSlice'
import mainStyle from '../../../../../../utils/styling/mainStyle'
import WeaponSkinTypeComponent from './WeaponSkinTypeComponent'
import { ScrollView } from 'react-native-gesture-handler'

interface WeaponSkinSheetProps {
    skin: Skin
}
export const WeaponSkinBottomSheet: React.FC<WeaponSkinSheetProps> = ({ skin }) => {
    const refRBSheet = useRef<RBSheet | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (skin != null)
            refRBSheet.current?.open()
        else
            refRBSheet.current?.close()
    }, [skin])

    return (
        <View>
            <RBSheet
                ref={refRBSheet}
                animationType='fade'
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={600}
                onClose={() => {
                    dispatch(selectSkin(null))
                }}
                customStyles={{
                    wrapper: {
                        backgroundColor: theme.colors.overlay
                    },
                    container: {
                        backgroundColor: theme.colors.accent,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                    },
                    draggableIcon: {
                        backgroundColor: theme.colors.primary
                    }
                }}
            >

                <View style={style.container}>
                    <View style={style.weaponSection}>
                        <Image source={{ uri: skin.displayIcon }} style={style.weaponThumbnail} resizeMode='contain' borderRadius={16} />
                        <Text style={[mainStyle.h3, style.weaponName]}>{skin.displayName}</Text>
                    </View>

                    <WeaponSkinTypeComponent skins={skin.chromas} refSheet={refRBSheet} />

                </View>

            </RBSheet>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    weaponSection: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        verticalAlign: 'middle',
        alignItems: 'center',
        marginBottom: 20,
    },
    weaponThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: theme.colors.accentLight
    },
    weaponName: {
        color: theme.colors.onBackground,
        marginStart: 10,
        flex: 1,
    }
})
