import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../../../../assets/res/theme'

interface AgentTagProps {
    tags?: string[] | null
}

const AgentsTagComponent: React.FC<AgentTagProps> = ({ tags }) => {
    const _keyExtractor = (item: string, index: number) => {
        // Your key extraction logic
        return item; // Replace with your actual key extraction logic
    }

    const _renderItem = ({ item }: { item: string }) => {
        return (
            <View style={style.wrapper}>
                <Text style={style.tag}>{item}</Text>
            </View>
        )
    }

    return (
        <FlatList style={[{flex: 1, marginVertical: 16}]}
            data={tags}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            horizontal={true}
        />
    )
}

const style = StyleSheet.create({
    wrapper : {
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        marginHorizontal: 8
    },
    tag : {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 8,
        marginVertical: 2,
        color : theme.colors.onBackground
    }
})

export default AgentsTagComponent
