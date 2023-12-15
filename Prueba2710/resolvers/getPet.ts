import { Request, Response } from "npm:express@4.18.2";
import PetModelType from "../db/Pets.ts";

const getPet = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const pet = await PetModelType.findOne({ dni }).exec();
    if (!pet) {
      res.status(404).send("Pet not found");
      return;
    }
    res.status(200).send({
      name: pet.name,
      description: pet.description,
      tipo: pet.tipo,
      id: pet._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPet;