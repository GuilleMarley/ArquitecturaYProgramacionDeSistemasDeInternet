import express, {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"


//import funciones
import addPerson from "./resolvers/addPerson.ts";
import deletePerson from "./resolvers/deletePerson.ts";
import getAllPeople from "./resolvers/getAllPeople.ts";
import actPerson from "./resolvers/actPerson.ts";

const env = await load()

const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL")
if(!URL_MONGO){
    console.error("Assign URL as enviroment var")
    Deno.exit(1)
}

try{

  await mongoose.connect(URL_MONGO)
  console.log("Succesful connection to Mongo.")

  const app = new express()
  app.use(express.json())

  app.post("/api/contactos",addPerson)
    .delete("/api/contactos/:dni",deletePerson)
    .get("/api/contactos",getAllPeople)
    .put("/api/contactos/:dni",actPerson)
    //.get("/api/contactos/:dni",getPerson)

  app.listen(3000, () => console.info("API ready"))

}catch(e){

  console.error(e)

}
