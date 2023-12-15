import { Request, Response } from "npm:express@4.18.2";
import { PersonModel } from "../db/Person.ts";

const updatePerson = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const { fullName, mail, postalCode, isoCode } = req.body;
    if (!fullName || !mail || !postalCode || !isoCode) {
      res.status(400).send("requires more data");
      return;
    }

    const updatedPerson = await PersonModel.findOneAndUpdate(
      { dni },
      { fullName, mail, postalCode, isoCode },
      { new: true }
    ).exec();

    if (!updatedPerson) {
      res.status(404).send("Person not found");
      return;
    }

    res.status(200).send({
      fullName: updatedPerson.fullName,
      mail: updatedPerson.mail,
      postalCode: updatedPerson.postalCode,
      isoCode: updatedPerson.isoCode,
      dni: updatedPerson.dni,
      id: updatedPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatePerson;