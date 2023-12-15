import mongoose from "npm:mongoose@8.0.0"; //npmjs.com/package/mongoose
import { Client } from "../types.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    dni: { type: String, required: true },
    name: { type: String, required: true },
    walletSize: { type: Number, required: true },
    cars: [
        {type: String}
    ],
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type ClientModelType = mongoose.Document;

export const ClientModel = mongoose.model<ClientModelType>("Clients", clientSchema);