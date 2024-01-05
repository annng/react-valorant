import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { stackScreen } from '../../../../core/shared/Routing'
import { Animated, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyle from '../../../../utils/styling/mainStyle'
import { ScrollView } from 'react-native-gesture-handler'
import WeaponDetailBackgroundComponent from './component/WeaponDetailBackgroundComponent'
import WeaponDetailState from './WeaponDetailState'
import { Skin, Weapons } from '../../../../data/response/Weapons'
import { ResponseData } from '../../../../data/response/ResponseData'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../core/state/Store'
import { WeaponSkinBottomSheet } from './component/bottomsheet/WeaponSkinBottomSheet'
import { theme } from '../../../../assets/res/theme'
import { HeaderBackButton } from '@react-navigation/elements'


type WeaponDetailProps = NativeStackScreenProps<stackScreen, 'WeaponDetail'>

const WeaponDetailScreen: React.FC<WeaponDetailProps> = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const selectedSkin = useSelector((state: RootState) => state.weaponSkin.value);


    const weaponDetailState = WeaponDetailState()
    const weapon: ResponseData<Weapons> = weaponDetailState.weapon

    const { uuid, title } = route.params


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


    useEffect(() => {
        const fetchData = async () => {
            if (uuid != null) {
                await weaponDetailState.fetchWeaponDetail(uuid);
            } else {
                navigation.pop();
            }
        };

        fetchData()
    }, [uuid, navigation])

    return (
        <SafeAreaView style={mainStyle.wrapper}>
            <ScrollView style={mainStyle.wrapper} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}>
                <View>
                    {weapon.data != null ? (<WeaponDetailBackgroundComponent weapon={weapon.data} />) : null}
                    {selectedSkin != null ? (<WeaponSkinBottomSheet skin={selectedSkin} />) : null}
                </View>
            </ScrollView>

            <View style={[mainStyle.containerBack, { backgroundColor: backgroundColor }]}>
                <HeaderBackButton onPress={() => navigation.pop()} style={mainStyle.backButton} tintColor={theme.colors.onBackground} />
            </View>
        </SafeAreaView>
    )
}

export default WeaponDetailScreen