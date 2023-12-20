import { StyleSheet } from "react-native";
import { theme } from "../../assets/res/theme";

const useTheme = theme

const mainStyle = StyleSheet.create({
    background: {
        backgroundColor: useTheme.colors.background,
        height: '100%',
        width: '100%'
    },
    h3 : {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'VALORANT Regular'
    },
    h4 : {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'VALORANT Regular'
    },
    h5 : {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'VALORANT Regular'
    }
})

export default mainStyle