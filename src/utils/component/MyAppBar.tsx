import { Image, StyleProp, StyleSheet, TextStyle } from "react-native"
import { Appbar } from "react-native-paper"
import { theme } from "../../assets/res/theme"

export function LogoImage() {
    return (
      <Image
        style={style.logo}
        source={require('../../assets/img/img_logo_valorant.png')}
      />
    );
  }

  const style = StyleSheet.create({
    logo: {
        width: 48,
        height: 48,
        resizeMode: 'contain'
    }
  })
