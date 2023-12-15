//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { ClientModel } from "../db/cliente.ts"
import { CarModel } from "../db/coches.ts"

const changeCars = async(req: Request, res: Response) => {

    const client_1 = req.params.client1
    const client_2 = req.params.client2
    const carTag = req.params.carTag

    const client1 = await ClientModel.findOne({dni : client_1})

    if(!client1){
        res.status(404).send("No client with the f1rst DNI.")
        return;
    }

    const client2 = await ClientModel.findOne({dni : client_2})

    if(!client2){
        res.status(404).send("No client with the second DNI.")
        return;
    }

    const car = await CarModel.findOne({tag : carTag})

    if(!car){
        res.status(404).send("Car does not exist")
        return;
    }

    //Primero compruebo si el coche esta en ese concesionario
    const carIndexInClient = client1.cars.findIndex((car) => car === carTag)
    if(carIndexInClient != -1 ){
        //Ahora compruebo si el cliente tiene dinero suficiente
        if(client2.walletSize >= car.price){
            //Si tiene dinero primero le cobro y le quito el precio del coche
            client2.walletSize = client2.walletSize - car.price
            client1.walletSize = client1.walletSize + car.price
            //Elimino el coche del concesionario
            client1.cars.splice(carIndexInClient, 1) 
            //Añado el coche al cliente
            client2.cars.push(carTag)
            //Guardo todos los cambios hechos
            await Promise.all([client1.save(), client2.save()])

            res.status(200).send("Car traded between clients.")

        } else {

            res.status(400).send("Not enough money from client 2 to buy the car.")
        
        }

    } else {

        res.status(400).send("That car is not for sale here.")
    
    }
}

export default changeCars