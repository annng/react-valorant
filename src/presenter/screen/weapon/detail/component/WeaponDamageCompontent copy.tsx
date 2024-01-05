import React from 'react'
import { Callout, MapGame } from '../../../../../data/response/MapGame'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import mainStyle from '../../../../../utils/styling/mainStyle'
import { theme } from '../../../../../assets/res/theme'
import { DamageRange, Weapons } from '../../../../../data/response/Weapons'

interface WeaponDamageProps {
    damage: DamageRange[]
}
const WeaponDamageComponent: React.FC<WeaponDamageProps> = ({ damage }) => {

    return (
        <View style={style.container}>


            <View style={style.wrapper}>
                <Text style={[mainStyle.body2, style.textTitle]}>Distance</Text>
                <Text style={[mainStyle.p, style.textTitle, { textAlign: 'center' }]}>{damage[0].rangeStartMeters}-{damage[0].rangeEndMeters} m</Text>
                {damage.length > 1 && (<Text style={[mainStyle.p, style.textTitle, { textAlign: 'right' }]}>{damage[1].rangeStartMeters}-{damage[1].rangeEndMeters} m</Text>)}
            </View>
            <View style={style.wrapper}>
                <Text style={[mainStyle.body2, style.textTitle]}>Head</Text>
                <Text style={[mainStyle.p, style.textTitle, { textAlign: 'center' }]}>{damage[0].headDamage}</Text>
                {damage.length > 1 && (<Text style={[mainStyle.p, style.textTitle, { textAlign: 'right' }]}>{damage[1].headDamage}</Text>)}
            </View>
            <View style={style.wrapper}>
                <Text style={[mainStyle.body2, style.textTitle]}>Body</Text>
                <Text style={[mainStyle.p, style.textTitle, { textAlign: 'center' }]}>{damage[0].bodyDamage}</Text>
                {damage.length > 1 && (<Text style={[mainStyle.p, style.textTitle, { textAlign: 'right' }]}>{damage[1].bodyDamage}</Text>)}
            </View>
            <View style={style.wrapper}>
                <Text style={[mainStyle.body2, style.textTitle]}>Leg</Text>
                <Text style={[mainStyle.p, style.textTitle, { textAlign: 'center' }]}>{damage[0].legDamage}</Text>
                {damage.length > 1 && (<Text style={[mainStyle.p, style.textTitle, { textAlign: 'right' }]}>{damage[1].legDamage}</Text>)}
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
        flexGrow: 3,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    textTitle: {
        paddingVertical: 2,
        flex: 1
    },
    textValue: {
        color: theme.colors.secondary,
        fontWeight: 'bold',
        paddingVertical: 2,
    }
})

export default WeaponDamageComponent