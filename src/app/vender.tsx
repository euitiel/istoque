import { Input } from "@/components/input"
import React, { useEffect, useState } from "react";
import { SafeAreaView, Alert, Text, FlatList, Button } from "react-native"
import { router, Router } from "expo-router";
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase";
import { Product } from "@/components/product";
import { Link } from "expo-router";
import { ProductsToSell } from "@/components/productsToSell";

export default function Vender (){
    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [search, setSearch] = useState ("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState <ProductDatabase[]>([])
    const [actualQuantity, setActualQuantity] = useState ("")
    const productDatabase = useProductDatabase()


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
            

        const response = await productDatabase.updateSell({
            id: Number(id),
            name, 
            quantity: Number(quantity) - Number(actualQuantity), 
            price: Number(price)});
            Alert.alert("Produto vendido.")
            setId("")
        setName("")
        setQuantity("")
        setPrice("")
        setActualQuantity("")
            await list()
    }catch(error){
        console.log(error)
    }}

    function details (item: ProductDatabase){
        setName(item.name)
        setQuantity(String(item.quantity))
        setPrice(String(item.price))
        setId(String(item.id))
    }

    useEffect(()=> {
        list()
    },[search])


    const Sellvalue = Number(actualQuantity) * Number(price)
    
    
    

    return <SafeAreaView style = {{flex:1, justifyContent: "center", padding: 32, gap: 10, backgroundColor: "lightyellow"}}>
        <Text style={{fontSize:24}}>ID selecionado: {id}</Text>
        <Text style={{fontSize:18}}>Nome do produto: {name}</Text>
        <Input keyboardType="numeric" placeholder = 'Quantidade' onChangeText={setActualQuantity} value ={actualQuantity}/>
        <Text>Valor da venda: {Sellvalue} </Text>
        <Button title= "Vender" onPress = {update}></Button>
        <Input placeholder = 'pesquisar'onChangeText={setSearch}/>

        <FlatList
        data = {products}
        keyExtractor ={(item) => String(item.id)}
        renderItem = {({item})=> <ProductsToSell data = {item} onPress={()=> details(item)}
        >
        </ProductsToSell> }
        contentContainerStyle = {{gap: 8}}>
        </FlatList>
    </SafeAreaView>
    
}
