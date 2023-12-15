import { Request, Response } from "npm:express@4.18.2";
import { DealerModel } from "../db/concesionario.ts";

const changeAllowance = async (req: Request, res: Response) => {
    const dealerName = req.params.dealerName

    const dealer = await DealerModel.findOne({name : dealerName})

    if(!dealer){
        res.status(404).send("Dealership not found")
        return;
    }

    dealer.allowance = !dealer.allowance
    
    await dealer.save()

    res.status(200).send("Allowance changed")
}

export default changeAllowance