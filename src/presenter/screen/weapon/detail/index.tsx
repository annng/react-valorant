import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyle from '../../../../utils/styling/mainStyle'
import { ScrollView } from 'react-native-gesture-handler'
import WeaponDetailBackgroundComponent from './component/WeaponDetailBackgroundComponent'
import WeaponDetailState from './WeaponDetailState'
import { Weapons } from '../../../../data/response/Weapons'
import { ResponseData } from '../../../../data/response/ResponseData'


type WeaponDetailProps = NativeStackScreenProps<stackScreen, 'WeaponDetail'>

const WeaponDetailScreen: React.FC<WeaponDetailProps> = ({ navigation, route }) => {

    const weaponDetailState = WeaponDetailState()
    const weapon: ResponseData<Weapons> = weaponDetailState.weapon

    const { uuid, title } = route.params

    useEffect(() => {
        const fetchData = async () => {
            if (uuid != null) {
              await weaponDetailState.fetchWeaponDetail(uuid);
            } else {
              navigation.pop();
            }
          };

          fetchData()
    }, [uuid, navigation])

    return (
        <SafeAreaView style={mainStyle.wrapper}>
            <ScrollView style={mainStyle.wrapper}>
                <View>
                    {weapon.data != null ? (<WeaponDetailBackgroundComponent weapon={weapon.data} />) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WeaponDetailScreen