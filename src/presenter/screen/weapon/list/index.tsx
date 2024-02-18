import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { stackScreen, useNavigation } from '../../../../core/shared/Routing'
import { SafeAreaView, TextInput, View } from 'react-native'
import mainStyle from '../../../../utils/styling/mainStyle'
import { theme } from '../../../../assets/res/theme'
import WeaponGridComponent from './component/WeaponGridComponent'
import WeaponListState from './WeaponListState'


type WeaponListProps = NativeStackScreenProps<stackScreen, 'WeaponList'>

const WeaponListScreen : React.FC<WeaponListProps> = ({ navigation, route }) => {

const state = WeaponListState()
const [keyword, setKeyword] = useState("")

const weapons = state.visibleWeapons

  return (
    <SafeAreaView style={mainStyle.wrapper}>
    <View style={mainStyle.wrapper}>
        <TextInput
            style={mainStyle.searchBar}
            placeholderTextColor={theme.colors.paragraph}
            placeholder="Type Weapons Name..."
            onChangeText={newText => state.searchMaps(newText)}
            defaultValue={keyword}
        />
        
        <WeaponGridComponent weapons={weapons}/>
    </View>
</SafeAreaView>
  )
}

export default WeaponListScreen
