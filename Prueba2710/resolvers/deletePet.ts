import { Request, Response } from "npm:express@4.18.2";
import PetModelType from "../db/Pets.ts";

const deletePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await PetModelType.findOneAndDelete({ id }).exec();
    if (!pet) {
      res.status(404).send("Pet not found");
      return;
    }
    res.status(200).send("Pet deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePet;