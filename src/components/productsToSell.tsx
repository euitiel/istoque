import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";

type Props = PressableProps & {
    data : {
    id: number
    name: string
    quantity: number 
    price: number
    }


    
}
export function ProductsToSell ({data, ...rest}: Props){
    return <Pressable style={{backgroundColor: "#CECECE", padding: 8, borderRadius:10, gap: 20,}} { ...rest}>
        <Text style ={{justifyContent: 'space-between', fontSize: 18, }} >
           ID:{data.id} {data.name}, QTD:{data.quantity}, Preço R$:{data.price}
        </Text>
    </Pressable>
}