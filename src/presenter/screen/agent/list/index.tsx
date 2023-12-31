import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AgentsGridComponent from './component/AgentsGridComponent'
import AgentListState from './AgentListState'
import { Agents } from '../../../../data/response/Agents'
import { theme } from '../../../../assets/res/theme'


type AgentListProps = NativeStackScreenProps<stackScreen, 'AgentList'>

const AgentListScreen: React.FC<AgentListProps> = ({ navigation, route }) => {
    const state = AgentListState()
    const [keyword, setKeyword] = useState("")

    var agents: Array<Agents> = state.visibleAgents



    return (
        <SafeAreaView style={style.wrapper}>
            <View style={style.wrapper}>
                <TextInput
                    style={style.searchBar}
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
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    searchBar: {
        borderColor: theme.colors.paragraph,
        borderWidth: 1,
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 12,
        color: theme.colors.onBackground
    }
})
export default AgentListScreen