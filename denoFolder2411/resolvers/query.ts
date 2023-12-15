import { PetModel } from "../db/Pets.ts";

export const Query = {
  pets: async (_parent: unknown, args: {breed?: string}) => {
    const { breed } = args;
    if (breed) {
      return await PetModel.find({ breed });
    }
    return await PetModel.find();
  },
  pet: async (_parent: unknown, args: {id: string}) => {
    const { id } = args;
    const pet = await PetModel.findById(id);
    if (!pet) {
      throw new Error("Pet not found");
    }
    return pet;
  },
  /*petByBreed: async (_parent: unknown, args) => {
    const { breed } = args;
    return await PetModel.find({ breed });
  },*/
};