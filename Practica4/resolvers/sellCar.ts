//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { DealerModel } from "../db/concesionario.ts" 
import { CarModel } from "../db/coches.ts"
import { ClientModel } from "../db/cliente.ts"

const sellCar = async(req: Request, res: Response) => {

    const dealerName = req.params.dealerName
    const clientDni = req.params.clientDni
    const carTag = req.params.carTag

    const dealer = await DealerModel.findOne({name : dealerName})

    if(!dealer){
        res.status(404).send("Dealership not found")
        return;
    }

    const client = await ClientModel.findOne({dni : clientDni})

    if(!client){
        res.status(404).send("No client with that DNI")
        return;
    }

    const car = await CarModel.findOne({tag : carTag})

    if(!car){
        res.status(404).send("Car does not exist")
        return;
    }
    //Primero compruebo si el coche esta en ese concesionario
    const carIndexInDealer = dealer.cars.findIndex((car) => car === carTag)
    if(carIndexInDealer != -1 ){
        //Ahora compruebo si el cliente tiene dinero suficiente 
        if(client.walletSize >= car.price){
            if(!dealer.allowance){
            //Si tiene dinero primero le cobro y le quito el precio del coche
            client.walletSize = client.walletSize - car.price
            //Elimino el coche del concesionario
            dealer.cars.splice(carIndexInDealer, 1) 
            //Añado el coche al cliente
            client.cars.push(carTag)
            //Guardo todos los cambios hechos
            await Promise.all([dealer.save(), client.save()])

            res.status(200).send("Car sold to client")
            } else {
                res.status(400).send("The dealer does not have permission to sell cars.")
            }
        } else {

            res.status(400).send("Not enough money.")
        
        }

    } else {

        res.status(400).send("That car is not for sale here.")
    
    }
}

export default sellCar