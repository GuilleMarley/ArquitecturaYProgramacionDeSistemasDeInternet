import express from "express"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import mongoose from "mongoose"

try{

    const env = await load()
    
    const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL")
    console.log("This is don1e")

    if(!URL_MONGO) {
        console.log("MONGO_URL is requiered")
        Deno.exit(1)
    }

    await mongoose.connect(URL_MONGO)
    const app = express()
    app.use(express.json())

    

    app.listen(3000, () => {
        console.log("Server is listening con port 3000")
    })

    

} catch (e) {
    console.log(e)
}