import { PetModel } from "../db/Pets.ts";

export const Mutation = {
  addPet: async (_parent: unknown, args: {name: string; breed: string; }) => {
    const { name, breed } = args;
    const pet = new PetModel({ name, breed });

    await pet.save();
    return pet;
  },
  updatePet: async (_parent: unknown, args: { id: string; name: string; breed: string }) => {
    const { name, breed, id } = args;
    const idFound = await PetModel.findById(id)
    if(!idFound){
      throw new Error("Pet not found");
    }
    
    const pet = await PetModel.findByIdAndUpdate(
      id,
      { name, breed },
      { new: true }
    );

    if (!pet) {
      throw new Error("Pet not found");
    }

    return pet;
  },
  removePet: async (_parent: unknown, args: { id: string }) => {
    const { id } = args;

    const pet = await PetModel.findByIdAndDelete(id);

    if (!pet) {
      throw new Error("Pet not found");
    }

    return pet;
  },
};