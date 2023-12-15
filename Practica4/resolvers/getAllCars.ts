//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { DealerModel } from "../db/concesionario.ts" 
import { CarModel } from "../db/coches.ts"

const getAllCars = async(req: Request, res: Response) => {

    const dealerName = req.params.dealerName

    const name_found = await DealerModel.findOne({name : dealerName})

    if(!name_found){
        res.status(404).send("Dealership not found")
        return;
    }

    const carTags = name_found.cars
    const cars = await Promise.all(carTags.map(async (t) => {
        return await CarModel.findOne({ tag: t })
    }));

    res.send(cars)

}

export default getAllCars