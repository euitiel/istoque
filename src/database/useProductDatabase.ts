import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase ={
    id: number
    name: string
    quantity: number
    price: number
}

export function useProductDatabase(){
    
    const database = useSQLiteContext()

    async function create(data: Omit< ProductDatabase, 'id'>){
        const statement = await database.prepareAsync(
            "INSERT INTO products (name,quantity,price) VALUES ($name, $quantity, $price)"
        )
        try{
        const result = await statement.executeAsync({
            $name: data.name,
            $quantity: data.quantity,
            $price: data.price,
        })

        const insertedRowId = result.lastInsertRowId.toString()

        return {insertedRowId}
        }catch(error){throw error}
        finally {
            await statement.finalizeAsync()
        }
    }

    async function searchByName(name:string) {
        try{
            const query = "SELECT * FROM products WHERE name LIKE ?"
            const response = await database.getAllAsync<ProductDatabase>(query, `%${name}%`)
            return response
        }catch (error) {throw error}
    }


    async function update(data: ProductDatabase){
        const statement = await database.prepareAsync(
            "UPDATE products SET name =$name, quantity = $quantity, price= $price WHERE id = $id"
        )
        try{
        await statement.executeAsync({
            $id: data.id,
            $name: data.name,
            $quantity: data.quantity,
            $price: data.price,
        })
        }catch(error){throw error}
        finally {
            await statement.finalizeAsync()
        }
    }

    async function updateSell(data: ProductDatabase){
        const statement = await database.prepareAsync(
            "UPDATE products SET  quantity = $quantity WHERE id = $id"
        )
        try{
        await statement.executeAsync({
            $id: data.id,
            $name: data.name,
            $quantity: data.quantity,
            $price: data.price,
        })
        }catch(error){throw error}
        finally {
            await statement.finalizeAsync()
        }
    }

    async function remove(id: number){
        try{
            await database.execAsync("DELETE FROM products WHERE id =" +id)
        }catch(error){console.log(error)}
    }

    async function show(id:number) {
        try{
            const query = "SELECT * FROM products WHERE id = ?"
            const response = await database.getFirstAsync<ProductDatabase>(query, id)
            return response
        }catch(error){console.log(error)}     
    }

    return{create, searchByName, update, remove, show, updateSell}

}