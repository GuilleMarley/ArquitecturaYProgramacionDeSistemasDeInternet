import mongoose from "npm:mongoose@7.6.3"
//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import addMascota from "./resolvers/addMascota.ts";
const env = await load()

const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL")
if(!URL_MONGO){
    console.error("Assign URL as enviroment var")
    Deno.exit(1)
}

try{

    await mongoose.connect(URL_MONGO)
    console.log("Succesful connection to Mongo.")

    const app = express()
    app.use(express.json())

    app
    .post("/api/mascotas", addMascota)
    /*.get.("/api/mascotas",)
    .get.("/api/mascotas:id",)
    .put.("/api/mascotas/:id",)
    .delete.("/api/mascotas/:id",)*/



    app.listen(3000, () => console.info("API ready"))

}catch(e){

    console.error(e)

}