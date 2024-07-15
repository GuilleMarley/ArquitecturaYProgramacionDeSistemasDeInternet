import mongoose from "mongoose";
import { Contacto } from "./types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        dni: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        postal: { type: String, required: true },
        iso: { type: String, required: true },
        id: { type: String, required: true },
        place_name: { type: String, required: true },
        pais: { type: String, required: true },
        datetime: { type: String, required: true },
        currentTime: { type: String, required: true },
    },
    { timestamps: true }
);

export type ContactModelType = mongoose.Document & Omit<Contacto, "id">;

contactSchema.path("email").validate((email: string) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(email);
}, "Correo mal declarado")

contactSchema.path("dni").validate((dni: string) => {
    return /^\d{8}[a-zA-Z]$/.test(dni);
}, "DNI mal declarado")

export const ContactModel = mongoose.model<ContactModelType>("Contact", contactSchema);