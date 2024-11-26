import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { InitializeDatabase } from "@/database/initializeDatabase";
import { SQLiteDatabase } from "expo-sqlite";



export default function Layout (){




    return (
    <SQLiteProvider databaseName = "myDatabase.db" onInit = {InitializeDatabase}>
    <Slot/>
    </SQLiteProvider>
    )
}