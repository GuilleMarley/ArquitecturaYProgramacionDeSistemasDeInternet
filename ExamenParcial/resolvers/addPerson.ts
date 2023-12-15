import express ,{Request, Response} from "npm:express@4.18.2"
import { PersonModel } from "../db/Person.ts";

const addPerson = async (req: Request, res: Response) => {
    try{
        const {dni, fullName, mail, postalCode, isoCode} = req.body

        if(!dni || !fullName || !mail || !postalCode || !isoCode){
            res.status(400).send("Missing data error 400")
            return
        }

        if(typeof dni !== "string" && typeof name !== "string" && typeof mail !== "string" && typeof postalCode !== "number" && typeof isoCode !== "string"){
            res.status(400).send("Error in type")
            return
        }

        const alreadyExists = await PersonModel.findOne({ dni }).exec();
        if (alreadyExists) {
          res.status(400).send("Person already exists");
          return;
        }

        const person = new PersonModel({
            dni, fullName, mail, postalCode, isoCode
        })

        await person.save()

        res.status(200).send({
            dni: person.dni,
            fullName: person.fullName,
            mail: person.mail,
            postalCode: person.postalCode,
            isoCode: person.isoCode
        })
    } catch (error) {
        res.status(500).send(error.message);
        return;
  }
}

export default addPerson