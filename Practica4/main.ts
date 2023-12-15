import mongoose from "npm:mongoose@8.0.0"
import express ,{Request, Response} from "npm:express@4.18.2"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"

//Function imports
import addCar from "./resolvers/addCar.ts";
import addClient from "./resolvers/addClient.ts";
import addDealer from "./resolvers/addDealer.ts";
import moveCarDealer from "./resolvers/moveCarDealer.ts";
import getAllCars from "./resolvers/getAllCars.ts";
import sellCar from "./resolvers/sellCar.ts";
import getAllClientCars from "./resolvers/getAllClientCars.ts";
import deleteCarDealer from "./resolvers/deleteDealerCar.ts";
import deleteCarClient from "./resolvers/deleteClientCar.ts";
import changeCars from "./resolvers/changeCars.ts";
import addMoney from "./resolvers/addMoney.ts";
import changeAllowance from "./resolvers/changeAllowance.ts";
import showAllClients from "./resolvers/showAllClients.ts";
import showAllCars from "./resolvers/showAllCars.ts";
import showAllDealers from "./resolvers/showAllDealers.ts";

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
  .post("/cars/create", addCar)
  .post("/dealer/create", addDealer)
  .post("/client/create", addClient)
  .put("/dealer/addCar/:dealerName/:carTag", moveCarDealer)
  .get("/dealer/getAll/:dealerName", getAllCars)
  .put("/dealer/sellCar/:dealerName/:clientDni/:carTag", sellCar)
  .get("/client/getAll/:dni", getAllClientCars)
  .put("/dealer/deleteCar/:dealerName/:carTag", deleteCarDealer)
  .put("/client/deleteCar/:dealerName/:carTag", deleteCarClient)
  .put("/client/clientToClient/:client1/:client2/:carTag", changeCars)
  .put("/client/addMoney/:client/:amount", addMoney)
  .put("/dealer/chengeAllowance/:dealerName", changeAllowance)
  .get("/showAllClients", showAllClients)
  .get("/showAllCars", showAllCars)
  .get("/showAllDealers", showAllDealers)

  app.listen(3000, () => console.info("API ready"))

}catch(e){

  console.error(e)

}