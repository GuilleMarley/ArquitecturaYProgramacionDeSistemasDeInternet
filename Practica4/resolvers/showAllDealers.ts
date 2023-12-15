//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { DealerModel } from "../db/concesionario.ts"

const showAllDealers = async(req: Request, res: Response) => {

    const dealers = await DealerModel.find()

    res.send(dealers)

}

export default showAllDealers