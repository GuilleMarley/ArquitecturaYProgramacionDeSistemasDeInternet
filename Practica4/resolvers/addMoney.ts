import { Request, Response } from "npm:express@4.18.2";
import { ClientModel } from "../db/cliente.ts";

const addMoney = async (req: Request, res: Response) => {

    const clientDni = req.params.client
    const amount = req.params.amount

    const client = await ClientModel.findOne({dni : clientDni})

    if(!client){
        res.status(404).send("No client with the first DNI.")
        return;
    }

    client.walletSize = client.walletSize + amount

    await client.save()

    res.status(200).send("Money added to client.")
}
export default addMoney