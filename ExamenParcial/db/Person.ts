import mongoose from "npm:mongoose@7.6.3";
import { Person } from "../types.ts";

const Schema = mongoose.Schema

const personSchema = new Schema(
    {
        dni: {type: String, required: true, unique: true},
        fullName: {type: String, required: true},
        mail: {type: String, required: true},
        postalCode: {type: Number, required: true},
        isoCode: {type: String, required: true},
    }
)

export type PersonModelType = mongoose.Document & Omit<Person, "id">

export const PersonModel = mongoose.model<PersonModelType>("Personas",personSchema)
