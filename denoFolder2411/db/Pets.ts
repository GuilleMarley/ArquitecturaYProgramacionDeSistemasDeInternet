import mongoose from "mongoose"
import {Pet} from "../types.ts"

const Schema = mongoose.Schema
const PetSchema = new Schema({
    name: {type: String, required: true},
    breed: {type: String, required: true},
}, {timestamps: true})

export type PetModelType = mongoose.Document & Omit<Pet, "id">
export const PetModel = mongoose.model<PetModelType>("Pet", PetSchema)
