import React from 'react'
import { Agents } from '../../../../../data/response/Agents'
import { StyleSheet, Text, View } from 'react-native'
import mainStyle from '../../../../../utils/styling/mainStyle'

interface AgentDetailInformationProp{
    agent : Agents
}
const AgentDetailInformationComponent : React.FC<AgentDetailInformationProp> = ({agent}) => {
  return (
    <View style={style.informationWrapper}>
        <Text style={[mainStyle.h4, style.spaceField]}>// STORY</Text>
        <Text style={[mainStyle.p, style.spaceSection]}>{agent.description}</Text>
        <Text style={[mainStyle.h4, style.spaceField]}>// SPECIAL ABILITIES</Text>
    </View>
  )
}

const style = StyleSheet.create({
    informationWrapper: {
        paddingHorizontal: 16,
        
    },
    spaceField : {
        margin: 0,
        marginBottom: 16
    },

    spaceSection: {
        marginBottom: 22
    }
})

export default AgentDetailInformationComponent
