//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { ClientModel } from "../db/cliente.ts" 
import { CarModel } from "../db/coches.ts"

const getAllClientCars = async(req: Request, res: Response) => {

    const dni = req.params.dni

    const dni_found = await ClientModel.findOne({dni : dni})

    if(!dni_found){
        res.status(404).send("Client not found")
        return;
    }

    const carTags = dni_found.cars
    const cars = await Promise.all(carTags.map(async (t) => {
        return await CarModel.findOne({ tag: t })
    }));

    res.send(cars)

}

export default getAllClientCars