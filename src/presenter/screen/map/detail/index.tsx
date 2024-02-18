import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../../../assets/res/theme'
import { ImageSlider } from 'react-native-image-slider-banner'
import { MapGame } from '../../../../data/response/MapGame'
import MapDetailState from './MapDetailState'
import { ResponseData } from '../../../../data/response/ResponseData'
import { ActivityIndicator } from 'react-native-paper'
import mainStyle from '../../../../utils/styling/mainStyle'
import MapDetailInfoComponent from './component/MapDetailInfoComponent'
import { HeaderBackButton } from '@react-navigation/elements'
import MapListComponent from '../../home/component/MapListComponent'

type MapDetailProps = NativeStackScreenProps<stackScreen, 'MapDetail'>

const MapDetailScreen: React.FC<MapDetailProps> = ({ navigation, route }: MapDetailProps) => {

    const mapDetailState = MapDetailState()
    const mapList = mapDetailState.mapList

    const { uuid, title } = route.params

    const maps: ResponseData<MapGame> = mapDetailState.maps
    // parse data && request detail data
    useEffect(() => {
        const fetchData = async () => {
            if (uuid != null) {
                await mapDetailState.fetchMaps(uuid);
                await mapDetailState.fetchListMaps()
            } else {
                navigation.pop();
            }
        };

        fetchData();
    }, [uuid, navigation])

    const scrollY = new Animated.Value(0);
    const [backgroundColor, setBackgroundColor] = useState('rgba(25,25,25, 0)'); // Initial background color

    useEffect(() => {
        const listenerId = scrollY.addListener(({ value }) => {
            // Update background color based on scroll position
            const alpha = Math.min(value / 200, 1); // Adjust the alpha value based on your needs
            setBackgroundColor(`rgba(25,25,25,${alpha})`);
        });

        return () => {
            // Clean up the listener when the component is unmounted
            scrollY.removeListener(listenerId);
        };
    }, [scrollY]);


    if (maps.data == null) {
        return (
            <SafeAreaView style={style.safeArea}>
                <ActivityIndicator size={'large'} style={mainStyle.loadingIndicator} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <ScrollView style={style.wrapper}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                <View style={style.wrapper}>
                    <ImageSlider
                        caroselImageContainerStyle={style.imgSlider}
                        caroselImageStyle={{ resizeMode: 'cover' }}
                        indicatorContainerStyle={{ position: 'relative', top: 10 }}
                        data={[
                            { img: maps.data.splash },
                            ...(maps.data.displayIcon ? [{ img: maps.data.displayIcon }] : []),
                        ]}
                        activeIndicatorStyle={{ backgroundColor: theme.colors.primary }}
                        autoPlay={false}
                        onItemChanged={(item) => {
                            //todo goto maxscreen image
                        }}
                        closeIconColor="#fff"
                    />
                    <MapDetailInfoComponent map={maps.data} />
                    <MapListComponent maps={mapList.data?.filter(e => e.displayName != maps.data?.displayName)}/>
                </View>
            </ScrollView>
            <View style={[mainStyle.containerBack, { backgroundColor: backgroundColor }]}>
                <HeaderBackButton onPress={() => navigation.pop()} style={mainStyle.backButton} tintColor={theme.colors.onBackground}/>
            </View>

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