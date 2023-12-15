//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"
import { DealerModel } from "../db/concesionario.ts" 

const addDealer = async (req: Request, res: Response)=> {
    const {name, allowance} = req.body

    const name_found = await DealerModel.findOne({name : name})

    if(name_found){
        res.status(400).send("Dealership already exists");
        return;
    }

    if(!name || !allowance){
        res.status(400).send("Missing data")
        return
    }

    if(typeof name !== "string" && typeof allowance !== "boolean"){
        res.status(400).send("Error in type")
        return
    }

    const dealer = new DealerModel({
        name, allowance, coches: []
    })

    await dealer.save()

    res.status(200).send({
        name: dealer.name,
        allowance: dealer.allowance,
        cars: dealer.cars,
    })

}

export default addDealer