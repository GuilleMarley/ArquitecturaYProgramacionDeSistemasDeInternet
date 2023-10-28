import { Request, Response } from "npm:express@4.18.2";
import PetModelType from "../db/Pets.ts";

const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, tipo } = req.body;
    if (!name || !description || !tipo) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedPet = await PetModelType.findOneAndUpdate(
      { id },
      { name, description, tipo },
      { new: true }
    ).exec();

    if (!updatedPet) {
      res.status(404).send("Pet not found");
      return;
    }

    res.status(200).send({
      name: updatedPet.name,
      description: updatedPet.description,
      tipo: updatedPet.tipo,
      id: updatedPet._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatePet;