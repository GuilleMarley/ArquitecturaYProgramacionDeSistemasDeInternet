//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { CarModel } from "../db/coches.ts"

const showAllCars = async(req: Request, res: Response) => {

    const cars = await CarModel.find()

    res.send(cars)

}

export default showAllCars