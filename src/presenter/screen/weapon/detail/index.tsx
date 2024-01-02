import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyle from '../../../../utils/styling/mainStyle'
import { ScrollView } from 'react-native-gesture-handler'


type WeaponDetailProps = NativeStackScreenProps<stackScreen, 'WeaponDetail'>

const WeaponDetailScreen: React.FC<WeaponDetailProps> = ({ navigation, route }) => {
    const { uuid, title } = route.params

    return (
        <SafeAreaView style={mainStyle.wrapper}>
            <ScrollView style={mainStyle.wrapper}>
                <View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default WeaponDetailScreen