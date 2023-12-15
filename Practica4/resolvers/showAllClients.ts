//@ts-ignore
import express ,{Request, Response} from "npm:express@4.18.2"

import { ClientModel } from "../db/cliente.ts"

const showAllClients = async(req: Request, res: Response) => {

    const clients = await ClientModel.find()

    res.send(clients)

}

export default showAllClients