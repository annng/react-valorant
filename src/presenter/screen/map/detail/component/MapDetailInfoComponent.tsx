import React from 'react'
import { MapGame } from '../../../../../data/response/MapGame'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import mainStyle from '../../../../../utils/styling/mainStyle'
import { theme } from '../../../../../assets/res/theme'
import MapDetailCalloutComponent from './MapDetailCalloutComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '../../../../../core/shared/Routing'

interface MapDetailInfoProps {
    map: MapGame
}

const MapDetailInfoComponent: React.FC<MapDetailInfoProps> = ({ map }) => {
    const callSign = map.mapUrl.split("/")
    const { navigate } = useNavigation();

    return (
        <View style={style.wrapper}>
            <Text style={[mainStyle.h3, style.spaceField]}>{map.displayName.toUpperCase()} // {callSign[callSign.length - 1].toUpperCase()}</Text>
            {map.narrativeDescription != null && (
                <Text style={[mainStyle.p, style.description]}>{map.narrativeDescription}</Text>
            )}
            <Text style={[mainStyle.h4, style.spaceField]}>// INFO</Text>
            <View style={style.wrapperInfo}>
                <View style={style.wrapperField}>
                    <Text style={[mainStyle.p]}>Coordinate</Text>
                    <Text style={[mainStyle.body]}>{map.coordinates}</Text>
                </View>
                <View style={style.wrapperField}>
                    <Text style={[mainStyle.p]}>Callsign</Text>
                    <Text style={[mainStyle.body]}>{callSign[callSign.length - 1]}</Text>
                </View>
                {map.tacticalDescription != null && (
                    <View style={style.wrapperField}>
                        <Text style={[mainStyle.p]}>Tactical</Text>
                        <Text style={[mainStyle.body]}>{map.tacticalDescription}</Text>
                    </View>
                )}

                <Text style={[mainStyle.h4, style.spaceField]}>// SITE</Text>
                <MapDetailCalloutComponent callouts={map.callouts} />

                <TouchableOpacity onPress={() => {
                    navigate('ZoomImage', { url: map.displayIcon })
                }}>
                    <Image source={{ uri: map.displayIcon }} style={style.siteMap} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    spaceField: {
        margin: 16,
    },
    description: {
        marginHorizontal: 16,
        marginBottom: 8
    },
    wrapperInfo: {
        flex: 1
    },
    wrapperField: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-between',
    },
    siteMap: {
        flex: 1,
        marginVertical: 16,
        height: 350,
        resizeMode: 'contain',
        shadowColor: theme.colors.onBackground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    }

})
export default MapDetailInfoComponent