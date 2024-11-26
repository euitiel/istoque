import { Pressable, SafeAreaView, Text, Image } from "react-native";
import { Link } from "expo-router";


export default function Index(){
    return(
    <SafeAreaView style={{flex:1, padding:20, backgroundColor:"lightyellow", justifyContent: 'center', alignItems:'center', gap:8, borderRadius:25,}}>
        
        <Text style={{fontSize:22}}> Controle de estoque</Text>
        <Pressable style={{backgroundColor:'lightblue',padding:12, borderRadius:15, width:'80%',alignItems:'center'}}>
        <Link href = "/vender" style={{fontSize:20}}> Vender </Link>
        </Pressable >
        <Pressable style={{backgroundColor:'lightblue',padding:12, borderRadius:15, width:'80%',alignItems:'center'}}>
        <Link href = "/gerenciar" style={{fontSize:20}}> Gerenciar produtos</Link>
        </Pressable>
        <Pressable style={{backgroundColor:'lightblue',padding:12, borderRadius:15, width:'80%',alignItems:'center'}}>
        <Link href = "/compras" style={{fontSize:20}}> Entrada de compras</Link>
        </Pressable>


    </SafeAreaView>
    )
}