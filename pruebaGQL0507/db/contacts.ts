import mongoose from "mongoose";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: true, unique: false},
    phone: { type: String, required: true, unique:true},
    country: { type: String, required: true, unique: false},
},{timestamps: true});

export type ContactModelType = mongoose.Document & Omit<Contacto, "id">;
export const ContactModel = mongoose.model<ContactModelType>("Contact", contactSchema);