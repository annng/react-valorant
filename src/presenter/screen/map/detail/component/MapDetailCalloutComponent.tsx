import React from 'react'
import { Callout, MapGame } from '../../../../../data/response/MapGame'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import mainStyle from '../../../../../utils/styling/mainStyle'
import { theme } from '../../../../../assets/res/theme'

interface MapDetailCalloutProps {
    callouts: Callout[]
}
const MapDetailCalloutComponent: React.FC<MapDetailCalloutProps> = ({ callouts }) => {


    const _keyExtractor = (item: Callout, index: number) => {
        return `${item.regionName}-${item.superRegionName}`;
    }


    const _renderItem = ({ item }: { item: Callout }) => {

        // const formattedColors = item.backgroundGradientColors.map(color => `#${color}`);

        // const numColumns = 2;
        // const screenWidth = Dimensions.get('window').width;
        // const itemWidth = (screenWidth / numColumns) - 8;

        return (
            <View style={style.wrapper}>
                <Text style={[mainStyle.p]}>{item.regionName}</Text>
                <Text style={[mainStyle.p]}> - </Text>
                <Text style={[mainStyle.p, style.textRoleRegion]}>{item.superRegionName}</Text>
            </View>
        )
    }
    return (

        <FlatList
            style={style.flatListContainer}
            data={callouts}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            numColumns={2}
            scrollEnabled={false}
        />
    )
}

const style = StyleSheet.create({
    flatListContainer: {
        flexGrow: 1,
        paddingLeft: 16,
    },
    wrapper: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    textRoleRegion : {
        color : theme.colors.primary,
    }
})

export default MapDetailCalloutComponent