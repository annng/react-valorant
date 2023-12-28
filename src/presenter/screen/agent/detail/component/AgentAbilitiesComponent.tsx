import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { Ability } from "../../../../../data/response/Agents"
import { theme } from "../../../../../assets/res/theme";
import mainStyle from "../../../../../utils/styling/mainStyle";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AgentAbilitiesProps {
    abilities: Ability[],
}
const AgentAbilitiesComponent: React.FC<AgentAbilitiesProps> = ({ abilities }) => {

    const _keyExtractor = (item: Ability, index: number) => {

        return item.slot.toString();
    }

    const [isExpand, setIsExpand] = useState("")

    const _renderItem = ({ item }: { item: Ability }) => {

        return <TouchableOpacity onPress={() => {
            setIsExpand(item.slot)
        }}><View style={style.itemWrapper}>
            <View style={style.itemIconWrapper}>
                {item.displayIcon != null && (<Image source={{ uri: item.displayIcon }} style={style.itemIcon} />)}
                {item.displayIcon == null && (<Image source={require('../../../../../assets/img/img_logo_valorant.png')} style={[style.itemIcon, {tintColor: 'rgba(255, 255, 255, 1)'}]} />)}
            </View>
            <View style={style.itemInformationWrapper}>
                <Text style={[mainStyle.h4, { margin: 0, marginBottom: 8 }]}>{item.displayName}</Text>

                <Text style={[mainStyle.p, style.itemDescription]}
                    ellipsizeMode={isExpand == item.slot ? undefined : "tail"} numberOfLines={isExpand == item.slot ? undefined : 2}>{item.description}</Text>
            </View>
        </View>
        </TouchableOpacity>
    }
    return (
        <FlatList
            data={abilities}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            scrollEnabled={false}
        />
    )
}

const style = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 10,
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        alignContent: 'center',
        alignItems: 'center'
    },
    itemIconWrapper: {
        margin: 4,
        borderRadius: 8,
        backgroundColor: theme.colors.primaryTransparent
    },
    itemIcon: {
        width: 36,
        height: 36,
        margin: 12
    },
    itemInformationWrapper: {
        marginLeft: 8,
        flex: 1,
    },
    itemDescription: {
        flex: 1,
    }
})

export default AgentAbilitiesComponent