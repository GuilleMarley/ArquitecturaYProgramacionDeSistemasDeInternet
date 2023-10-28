import mongoose from "npm:mongoose@7.6.3"
import { Pet } from "../Types.ts"

const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tipo: { type: String, required: true },
  },
  { timestamps: true }
);

export type PetModelType = mongoose.Document & Omit<Pet, "id">;

export default mongoose.model<PetModelType>("Person", petSchema);