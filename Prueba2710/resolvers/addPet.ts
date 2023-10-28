import { Request, Response } from "npm:express@4.18.2";
import PetModelType  from "../db/Pets.ts";

const addPet = async (req: Request, res: Response) => {
  try {
    console.log("eatoy aqui")
    const { name, description, tipo } = req.body;
    if (!name || !description || !tipo) {
      res.status(400).send("Faltan datos de la mascota.");
      return;
    }

    const newPet = new PetModelType({ name, description, tipo });
    await newPet.save();

    res.status(200).send({
      name: newPet.name,
      description: newPet.description,
      tipo: newPet.tipo,
      id: newPet._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPet;