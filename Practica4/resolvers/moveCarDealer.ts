//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { DealerModel } from "../db/concesionario.ts" 
import { CarModel } from "../db/coches.ts"

const moveCarDealer = async(req: Request, res: Response) => {

    const dealerName = req.params.dealerName
    const carTag = req.params.carTag

    const name_found = await DealerModel.findOne({name : dealerName})

    if(!name_found){
        res.status(404).send("Dealership not found")
        return;
    }

    const car_found = await CarModel.findOne({tag : carTag})

    if(!car_found){
        res.status(404).send("car does not exist")
        return;
    }

    if (!name_found.cars) {
        name_found.cars = []
    }
    
    if (name_found.cars.includes(carTag)) {
        res.status(400).send("Car is already for sell")
        return;
    }

    if (name_found.cars.length >= 10) {
        res.status(400).send("Dealer cant add more cars to their collection")
        return;
      }
    
      name_found.cars.push(carTag)
    
      await name_found.save()
    
      res.status(200).send("Car added to dealership")

    
}

export default moveCarDealer
