import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { SafeAreaView, TextInput, View } from 'react-native'
import { stackScreen } from '../../../../core/shared/Routing'
import mainStyle from '../../../../utils/styling/mainStyle'
import { theme } from '../../../../assets/res/theme'
import AgentsGridComponent from '../../agent/list/component/AgentsGridComponent'
import MapListState from './MapListState'
import MapsGridComponent from './component/MapsGridComponent'

type MapListProps = NativeStackScreenProps<stackScreen, 'MapList'>

const MapListScreen : React.FC<MapListProps> = ({navigation, route}) => {

    const state = MapListState()
    const [keyword, setKeyword] = useState("")

    const maps = state.visibleMap

  return (
    <SafeAreaView style={mainStyle.wrapper}>
            <View style={mainStyle.wrapper}>
                <TextInput
                    style={mainStyle.searchBar}
                    placeholderTextColor={theme.colors.paragraph}
                    placeholder="Type Maps Name..."
                    onChangeText={newText => state.searchMaps(newText)}
                    defaultValue={keyword}
                />
                
                <MapsGridComponent maps={maps}/>
            </View>
        </SafeAreaView>
  )
}

export default MapListScreen
