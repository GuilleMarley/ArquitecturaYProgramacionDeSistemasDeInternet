//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { DealerModel } from "../db/concesionario.ts" 
import { CarModel } from "../db/coches.ts"

const deleteCarDealer = async(req: Request, res: Response) => {

    const dealerName = req.params.dealerName
    const carTag = req.params.carTag

    const dealer = await DealerModel.findOne({name : dealerName})

    if(!dealer){
        res.status(404).send("Dealership not found")
        return;
    }

    const car = await CarModel.findOne({tag : carTag})

    if(!car){
        res.status(404).send("Car does not exist")
        return;
    }

    const carIndexInDealer = dealer.cars.findIndex((car) => car === carTag)
    console.log("carIndexInDealer: " + carIndexInDealer)
    if(carIndexInDealer != -1 ){
        console.log("Estoy en el if")
        dealer.cars.splice(carIndexInDealer, 1) 
        console.log("hago el splice")
        await dealer.save()
    }else{
        res.status(400).send("That car is not for sale here.")
        return;
    }

}

export default deleteCarDealer