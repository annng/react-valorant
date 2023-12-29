import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../../../assets/res/theme'
import { useNavigation } from '@react-navigation/native'
import AgentDetailState from '../../agent/detail/AgentDetailState'
import { ImageSlider } from 'react-native-image-slider-banner'
import { MapGame } from '../../../../data/response/MapGame'
import MapDetailState from './MapDetailState'
import { ResponseData } from '../../../../data/response/ResponseData'
import { ActivityIndicator } from 'react-native-paper'
import mainStyle from '../../../../utils/styling/mainStyle'
import MapDetailInfoComponent from './component/MapDetailInfoComponent'
import { HeaderBackButton } from '@react-navigation/elements'

type MapDetailProps = NativeStackScreenProps<stackScreen, 'MapDetail'>

const MapDetailScreen: React.FC<MapDetailProps> = ({ navigation, route }: MapDetailProps) => {

    const mapDetailState = MapDetailState()

    const { uuid, title } = route.params
    useNavigation<NativeStackNavigationProp<stackScreen>>()

    const maps: ResponseData<MapGame> = mapDetailState.maps
    // parse data && request detail data
    useEffect(() => {
        const fetchData = async () => {
            if (uuid != null) {
                await mapDetailState.fetchMaps(uuid);
            } else {
                navigation.pop();
            }
        };

        fetchData();
    }, [uuid, navigation])


    if (maps.data == null) {
        return (
            <SafeAreaView style={style.safeArea}>
                <ActivityIndicator size={'large'} style={mainStyle.loadingIndicator} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <ScrollView style={style.wrapper}>
                <View style={style.wrapper}>
                    <ImageSlider
                        caroselImageContainerStyle={style.imgSlider}
                        caroselImageStyle={{ resizeMode: 'cover' }}
                        indicatorContainerStyle={{ position: 'relative', top: 10 }}
                        data={[
                            { img: maps.data.splash },
                            { img: maps.data.displayIcon },
                        ]}
                        activeIndicatorStyle={{ backgroundColor: theme.colors.primary }}
                        autoPlay={false}
                        onItemChanged={(item) => {
                            //todo goto maxscreen image
                        }}
                        closeIconColor="#fff"
                    />
                    <MapDetailInfoComponent map={maps.data} />

                    <HeaderBackButton onPress={() => navigation.pop()} style={mainStyle.backButton} tintColor={theme.colors.onBackground} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    wrapper: {
        flex: 1
    },
    imgSlider: {
        height: 200
    }
})

export default MapDetailScreen