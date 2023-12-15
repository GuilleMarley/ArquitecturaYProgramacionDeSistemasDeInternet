//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"
import { ClientModel } from "../db/cliente.ts"

const addClient = async (req: Request, res: Response)=> {
    const {dni, name, walletSize} = req.body

    const dni_found = await ClientModel.findOne({ dni: dni }); 

    if (dni_found) {
        res.status(400).send("Person already exists");
        return;
    }

    if(!dni || !name || !walletSize){
        res.status(400).send("Missing data")
        return
    }

    if(typeof dni !== "string" && typeof name !== "string" && typeof walletSize !== "number"){
        res.status(400).send("Error in type")
        return
    }

    const client = new ClientModel({
        dni, name, walletSize, coches: []
    })

    console.log(dni[9])
    if(dni.length != 9 ){
        res.status(400).send("Error in dni")
        return
    }

    await client.save()

    res.status(200).send({
        dni: client.dni,
        name: client.name,
        walletSize: client.walletSize,
        cars: client.cars,
    })

}

export default addClient