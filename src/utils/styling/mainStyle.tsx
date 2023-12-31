import { StyleSheet } from "react-native";
import { theme } from "../../assets/res/theme";

const useTheme = theme

const mainStyle = StyleSheet.create({
    background: {
        backgroundColor: useTheme.colors.background,
        height: '100%',
        width: '100%'
    },
    h3: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'Poppins-Bold'
    },
    h4: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'VALORANT Regular'
    },
    h5: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 8,
        color: theme.colors.onBackground,
        fontFamily: 'VALORANT Regular'
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.onSurface,
        lineHeight: 20
    },
    p: {
        fontSize: 14,
        fontWeight: '400',
        color: theme.colors.paragraph,
        lineHeight: 20
    },
    loadingIndicator: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBack: {
        flex: 1,
        flexGrow: 1,
        width : '100%',
        position: 'absolute',
        top: 0,
        height: 52
    },
    backButton: {
        flex: 1,
    },
})

export default mainStyle