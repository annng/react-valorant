import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeState from "./HomeState";
import { ResponseData } from "../../../data/response/ResponseData";
import { MapGame } from "../../../data/response/MapGame";
import AgentListComponent from "./component/AgentListComponent";
import { Agents } from "../../../data/response/Agents";
import { theme } from "../../../assets/res/theme";
import React from "react";
import mainStyle from "../../../utils/styling/mainStyle";
import MapListComponent from "./component/MapListComponent";
import { Weapons } from "../../../data/response/Weapons";
import { ScrollView } from "react-native-gesture-handler";
import WeaponsGridComponent from "./component/WeaponsGridComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreen } from "../../../core/shared/Routing";

type HomeScreenProps = NativeStackScreenProps<stackScreen, 'Home'>

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const homeState = HomeState()

    const maps: ResponseData<Array<MapGame>> = homeState.maps
    const agents: ResponseData<Array<Agents>> = homeState.agents || []
    const weapons: ResponseData<Array<Weapons>> = homeState.weapons || []


    if (maps.data == null || agents.data == null || weapons.data == null) {
        // If imageUrl is not available, you can render a placeholder or loading indicator
        return <View style={HomeStyle.wrapper}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
    }

    const indexRandomMap = Math.floor(Math.random() * (maps.data?.length || 0))
    const bgDefault = "https://www.cnet.com/a/img/resize/8bc1fe51f38b84a7ee99cae6d2cdee3709c6db9d/hub/2021/09/02/1511ef05-2457-4272-918d-6719d4897e65/beta-key-art-valorant.jpg?auto=webp&fit=crop&height=675&width=1200"

    return (
        <View style={HomeStyle.container}>
            <ImageBackground style={HomeStyle.background} source={{ uri: maps.data?.[indexRandomMap]?.splash || bgDefault }} blurRadius={20}>
                <ScrollView>
                    <View style={HomeStyle.wrapper}>
                        <View style={HomeStyle.titleContainer}>
                            <Text style={[mainStyle.h3, { flex: 1 }]}>Agents</Text>
                            <TouchableOpacity onPress={() => { navigation.push("AgentList") }}>
                                <Text style={[mainStyle.h5, { color: theme.colors.primaryDark }]}>See More</Text>
                            </TouchableOpacity>
                        </View>
                        <AgentListComponent items={agents.data?.slice(0, 4)} style={HomeStyle.agentContent} navigation={navigation} />
                        <View style={HomeStyle.titleContainer}>
                            <Text style={[mainStyle.h3, { flex: 1 }]}>Maps</Text>
                            <TouchableOpacity onPress={() => { navigation.push("MapList") }}>
                            <Text style={[mainStyle.h5, { color: theme.colors.primaryDark }]}>See More</Text>
                            </TouchableOpacity>
                        </View>
                        <MapListComponent maps={maps.data?.slice(0, 4)}/>
                        <View style={HomeStyle.titleContainer}>
                            <Text style={[mainStyle.h3, { flex: 1 }]}>Weapons</Text>
                            <TouchableOpacity onPress={() => { navigation.push("WeaponList")}}>
                                <Text style={[mainStyle.h5, { color: theme.colors.primaryDark }]}>See More</Text>
                            </TouchableOpacity>
                        </View>
                        <WeaponsGridComponent items={weapons.data?.slice(0, 4)} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
    },
    wrapper: {
        backgroundColor: theme.colors.overlay,
        flex: 1,
    },
    agentContent: {
        flexGrow: 1,
        maxHeight: 316,
        height: 'auto',
        flexBasis: 'auto'
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        alignContent: 'space-between'
    }
})

export default HomeScreen