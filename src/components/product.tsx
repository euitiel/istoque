import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import { MaterialIcons} from "@expo/vector-icons";

type Props = PressableProps & {
    data : {
    id: number
    name: string
    quantity: number 
    price: number
    }
    onDelete: () => void


    
}
export function Product ({data, onDelete, ...rest}: Props){
    return <Pressable style={{backgroundColor: "#CECECE", padding: 8, borderRadius:10, gap: 20,}} {...rest}>
        <Text style ={{justifyContent: 'space-between', fontSize: 18, }} >
           ID:{data.id} {data.name}, QTD:{data.quantity}, Preço R$:{data.price}
        </Text>

        <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name = "delete" size={18} color ="red"></MaterialIcons>
        </TouchableOpacity>

    </Pressable>
}