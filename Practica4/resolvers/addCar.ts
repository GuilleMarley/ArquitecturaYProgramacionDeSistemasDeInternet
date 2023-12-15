//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"
import { CarModel } from "../db/coches.ts"

const addCar = async (req: Request, res: Response)=> {
    const {tag, brand, model, price} = req.body

    const tag_found = await CarModel.findOne({tag : tag})

    if(tag_found){
        res.status(400).send("Car already exists");
        return;
    }

    if(!tag || !brand || !model || !price){
        res.status(400).send("Missing data")
        return
    }

    if(typeof tag !== "string" && typeof brand !== "string" && typeof model !== "string" && typeof price !== "number"){
        res.status(400).send("Error in type")
        return
    }

    const car = new CarModel({
        tag, brand, model, price
    })

    await car.save()

    res.status(200).send({
        tag: car.tag,
        brand: car.brand,
        model: car.model,
        price: car.price,
    })

}

export default addCar 