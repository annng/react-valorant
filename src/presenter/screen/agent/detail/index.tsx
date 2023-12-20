import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text, View } from "react-native"
import { theme } from "../../../../assets/res/theme";
import { useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreen } from "../../../../core/shared/Routing";

type AgentDetailProps = NativeStackScreenProps<stackScreen, 'AgentDetail'>

const AgentDetailScreen: React.FC<AgentDetailProps> = ({navigation, route} : AgentDetailProps) => {
    
    const {uuid, title} = route.params
    useNavigation<NativeStackNavigationProp<stackScreen>>()

    useEffect(() => {
      navigation.setOptions({
        title: title,
      });
    }, [route.params])
      
    return (
        <View>
          <Text style={{color: theme.colors.primary}}>{uuid}</Text>
          <Text style={{color: theme.colors.primary}}>Halo EveryBody</Text>
        </View>
    )
}

export default AgentDetailScreen