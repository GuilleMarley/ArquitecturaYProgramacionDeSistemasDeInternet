//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"
import MascotaModel from "../db/mascota.ts";
import { MASCOTATYPE } from "../types.ts";

const addMascota = async (req: Request, res: Response)=> {
    const {name, type, descripcion} = req.body
    if(!name || !type || !descripcion){
        res.status(400).send("Missing data")
        return
    }

    if(!Object.values(MASCOTATYPE).includes(type)){
        res.status(400).send("Error in type of Pet type")
    }

    if(typeof name !== "string" && typeof descripcion !== "string"){
        res.status(400).send("Error in type")
        return
    }

    const mascota = new MascotaModel({
        name, descripcion, type
    })

    await mascota.save()

    res.status(200).send({
        name: mascota.name,
        descripcion: mascota.descripcion,
        type: mascota.type,
        id: mascota.id
    })

}

export default addMascota 