import { Text } from "react-native-paper";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

interface EllipsizeProps{
    text : string
    style?: Object;
    maxLength : number
}
const EllipsisText : React.FC<EllipsizeProps>= (props, { maxLength = 50 }) => {
    if (!props.text || props.text.length <= maxLength) {
      return <Text style={props.style}>{props.text}</Text>;
    }
  
    const truncatedText = props.text.slice(0, maxLength - 3); // -3 to account for the ellipsis
    return <Text style={props.style}>{`${truncatedText}...`}</Text>;
  };

  export default EllipsisText