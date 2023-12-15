import { Request, Response } from "npm:express@4.18.2";
import { PersonModel } from "../db/Person.ts";

const getAllPeople = async (req: Request, res: Response) => {

    const person = (await PersonModel.find()).map(d => (d.dni, d.fullName))
    
    res.status(200).send(person)
}

export default getAllPeople