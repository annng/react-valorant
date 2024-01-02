import React from 'react'
import PropTypes from 'prop-types'
import { MapGame } from '../../../../data/response/MapGame'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import mainStyle from '../../../../utils/styling/mainStyle'
import { theme } from '../../../../assets/res/theme'
import { useNavigation } from '../../../../core/shared/Routing'

interface MapListProps {
    maps?: MapGame[] | null,
    style?: Object
}

const MapListComponent: React.FC<MapListProps> = props => {
    const {navigate} = useNavigation()

    const _keyExtractor = (item: MapGame, index: number) => {
        return item.uuid.toString();
    }

    const _renderItem = ({ item }: { item: MapGame }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigate("MapDetail", {
                    uuid: item.uuid,
                    title: item.displayName
                })
            }}>
                <View style={style.wrapper}>
                    <ImageBackground source={{ uri: item.splash }} style={style.thumbnail} borderRadius={8}>
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={style.overlay}
                        />
                        <Text style={[mainStyle.h4]}>{item.displayName}</Text>

                        {item.displayIcon && (<Image source={{ uri: item.displayIcon }} style={style.mapRadar} />)}
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList style={[props.style]}
            data={props.maps}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            horizontal={true}
        />
    )
}

const style = StyleSheet.create({
    wrapper: {
        width: 150,
        height: 150,
        marginHorizontal: 8,
        marginVertical: 6
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 8
    },
    thumbnail: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover'
    },
    mapRadar: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 75,
        height: 75,
        opacity: 0.6,
        resizeMode: 'contain'
    }
})

export default MapListComponent