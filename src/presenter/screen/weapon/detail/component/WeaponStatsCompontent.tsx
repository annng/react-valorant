import React from 'react'
import { Callout, MapGame } from '../../../../../data/response/MapGame'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import mainStyle from '../../../../../utils/styling/mainStyle'
import { theme } from '../../../../../assets/res/theme'
import { Weapons } from '../../../../../data/response/Weapons'

interface WeaponStatsProps {
    weapon: Weapons
}
const WeaponStatsCompontent: React.FC<WeaponStatsProps> = ({ weapon }) => {

    return (
        <View style={style.container}>
            <View style={style.row}>
                <View style={style.wrapper}>
                    <Text style={[mainStyle.body2,  style.textTitle]}>Fire Rate</Text>
                    <Text style={[mainStyle.p, style.textValue]}>{weapon.weaponStats.fireRate} rds/sec</Text>
                </View>
                <View style={style.wrapper}>
                    <Text style={[mainStyle.body2,  style.textTitle]}>Run Speed</Text>
                    <Text style={[mainStyle.p, style.textValue]}>{weapon.weaponStats.runSpeedMultiplier} m/sec</Text>
                </View>
            </View>
            <View style={style.row}>
                <View style={style.wrapper}>
                    <Text style={[mainStyle.body2,  style.textTitle]}>Equip Speed</Text>
                    <Text style={[mainStyle.p, style.textValue]}>{weapon.weaponStats.equipTimeSeconds} sec</Text>
                </View>
                <View style={style.wrapper}>
                    <Text style={[mainStyle.body2,  style.textTitle]}>Reload Speed</Text>
                    <Text style={[mainStyle.p, style.textValue]}>{weapon.weaponStats.reloadTimeSeconds} sec</Text>
                </View>
            </View>
            <View style={style.row}>
                <View style={style.wrapper}>
                    <Text style={[mainStyle.body2, style.textTitle]}>Magazine</Text>
                    <Text style={[mainStyle.p, style.textValue]}>{weapon.weaponStats.magazineSize} rds</Text>
                </View>
               
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8
    },
    row: {
        flexDirection: 'row'
    },
    wrapper: {
        width: '50%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    textTitle: {
        paddingVertical: 2
    },
    textValue: {
        color: theme.colors.secondary,
        fontWeight: 'bold',
        paddingVertical: 2
    }
})

export default WeaponStatsCompontent