//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { ClientModel } from "../db/cliente.ts" 
import { CarModel } from "../db/coches.ts"

const deleteCarClient = async(req: Request, res: Response) => {

    const clientDni = req.params.clientDni
    const carTag = req.params.carTag

    const client = await ClientModel.findOne({dni : clientDni})

    if(!client){
        res.status(404).send("Client not found")
        return;
    }

    const car = await CarModel.findOne({tag : carTag})

    if(!car){
        res.status(404).send("Car does not exist")
        return;
    }

    const carIndexInClient = client.cars.findIndex((car) => car === carTag)
    console.log("carIndexInClient: " + carIndexInClient)
    if(carIndexInClient != -1 ){
        console.log("Estoy en el if")
        client.cars.splice(carIndexInClient, 1) 
        console.log("hago el splice")
        await client.save()
    }else{
        res.status(400).send("That car is not in possession of this client.")
        return;
    }

}

export default deleteCarClient 