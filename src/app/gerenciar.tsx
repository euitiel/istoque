import { Input } from "@/components/input"
import { useEffect, useState } from "react";
import { SafeAreaView, Alert, Text, FlatList, Button } from "react-native"
import { router, Router } from "expo-router";
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase";
import { Product } from "@/components/product";


export default function Index (){
    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [search, setSearch] = useState ("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState <ProductDatabase[]>([])
    const productDatabase = useProductDatabase()

    async function create(){
        try {
            if(isNaN (Number(quantity))){
                return Alert.alert("A quantidade precisa ser um número.")

            }if (isNaN (Number(price))){
                return Alert.alert("O preço precisa ser um número.")
            }

        const response = await productDatabase.create({
            name, 
            quantity: Number(quantity), 
            price: Number(price)});
            Alert.alert("Produto cadastrado com o ID: "+response.insertedRowId)
            
    }catch(error){
        console.log(error)
    }}

    async function list(){
        try{
            const response = await productDatabase.searchByName(search)
            setProducts(response)

        }catch(error) {console.log(error)}
    }

    async function update(){
        try {
            if(isNaN (Number(quantity))){
                return Alert.alert("A quantidade precisa ser um número.")

            }if (isNaN (Number(price))){
                return Alert.alert("O preço precisa ser um número.")
            }

        const response = await productDatabase.update({
            id: Number(id),
            name, 
            quantity: Number(quantity), 
            price: Number(price)});
            Alert.alert("Produto atualizado.")
            
    }catch(error){
        console.log(error)
    }}

    function details (item: ProductDatabase){
        setName(item.name)
        setQuantity(String(item.quantity))
        setPrice(String(item.price))
        setId(String(item.id))
    }

    async function handleSave(){
        if (id){
            update()
        }else{create()}

        setId("")
        setName("")
        setQuantity("")
        setPrice("")
        await list()
    }

    async function remove(id: number){
        try {
            await productDatabase.remove(id)
        }catch(error){console.log(error)}
        await list()
    }

    useEffect(()=> {
        list()
    },[search])

    function screenTitle (){
        if (id)
            {return  "Editando o produto ID:"+id

            }return "Adicionar novo item."
        }

    return <SafeAreaView style = {{flex:1, justifyContent: "center", padding: 32, gap: 10, backgroundColor: "lightyellow"}}>
        <Text style={{fontSize:24}}>{screenTitle()}</Text>
        <Input  placeholder = 'Nome' onChangeText={setName} value={name}/>
        <Input keyboardType="numeric" placeholder = 'Quantidade' onChangeText={setQuantity} value = {quantity}/>
        <Input keyboardType="numeric" placeholder = 'Preço'onChangeText={setPrice} value={price}/>
        <Button title= "Salvar" onPress = {handleSave}></Button>
        <Input placeholder = 'pesquisar'onChangeText={setSearch}/>

        <FlatList
        data = {products}
        keyExtractor ={(item) => String(item.id)}
        renderItem = {({item})=> <Product data = {item} 
        onPress={() => details(item)} 
        onDelete ={() => remove(item.id)} 
        >
        </Product> }
        contentContainerStyle = {{gap: 8}}>
        </FlatList>
    </SafeAreaView>
    
}
