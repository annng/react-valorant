import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AgentsGridComponent from './component/AgentsGridComponent'
import AgentListState from './AgentListState'
import { Agents } from '../../../../data/response/Agents'
import { theme } from '../../../../assets/res/theme'
import mainStyle from '../../../../utils/styling/mainStyle'


type AgentListProps = NativeStackScreenProps<stackScreen, 'AgentList'>

const AgentListScreen: React.FC<AgentListProps> = ({ navigation, route }) => {
    const state = AgentListState()
    const [keyword, setKeyword] = useState("")

    var agents: Array<Agents> = state.visibleAgents

    return (
        <SafeAreaView style={mainStyle.wrapper}>
            <View style={mainStyle.wrapper}>
                <TextInput
                    style={mainStyle.searchBar}
                    placeholderTextColor={theme.colors.paragraph}
                    placeholder="Type Agents Name..."
                    onChangeText={newText => state.searchAgents(newText)}
                    defaultValue={keyword}
                />
                <AgentsGridComponent agents={agents}/>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    
})
export default AgentListScreen