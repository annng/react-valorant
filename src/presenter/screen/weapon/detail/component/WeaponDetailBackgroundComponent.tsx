import { Weapons } from "../../../../../data/response/Weapons";
import React from 'react'
import mainStyle from "../../../../../utils/styling/mainStyle";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../../assets/res/theme";
import WeaponStatsCompontent from "./WeaponStatsCompontent";
import WeaponDamageComponent from "./WeaponDamageCompontent copy";
import WeaponSkinComponent from "./WeaponSkinComponent";


interface WeaponDetailBackgroundProps {
    weapon: Weapons
}

export const WeaponDetailBackgroundComponent: React.FC<WeaponDetailBackgroundProps> = ({ weapon }) => {
    return (
        <View style={mainStyle.wrapper}>
            <View style={style.header}>
                <View style={style.headerWrapper}>
                    <Image source={{ uri: weapon.displayIcon }} style={style.imgHeader} />
                    <Text style={style.ornamentHeader}>{weapon.displayName}</Text>
                </View>
                <View>
                    {weapon.shopData.categoryText != null ? (
                        <View>
                            <Text style={mainStyle.h5}>{weapon.shopData.categoryText}</Text>
                            <View style={style.line}></View>
                        </View>
                    ) : null}
                    <WeaponStatsCompontent weapon={weapon} />
                    <View>
                        <Text style={mainStyle.h5}>Damage</Text>
                        <View style={style.line}></View>
                    </View>
                    <WeaponDamageComponent damage={weapon.weaponStats.damageRanges} />
                </View>
            </View>
            <WeaponSkinComponent skins={weapon.skins} />
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flex: 1,  
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    headerWrapper: {
        backgroundColor: theme.colors.primary,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        height: 150,
    },
    imgHeader: {
        resizeMode: 'contain',
        flex: 1
    },
    ornamentHeader: {
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        left: 20,
        flex: 1,
        fontSize: 88,
        fontWeight: '800',
        color: theme.colors.onBackground,
        zIndex: -10,
    },
    line: {
        borderBottomColor: theme.colors.onBackground,
        borderBottomWidth: 2,
        marginHorizontal: 8,
    }
})

export default WeaponDetailBackgroundComponent
