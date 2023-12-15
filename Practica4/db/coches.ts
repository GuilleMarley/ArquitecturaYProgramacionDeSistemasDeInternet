import mongoose from "npm:mongoose@8.0.0"; //npmjs.com/package/mongoose
import { Car } from "../types.ts";

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    tag: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true},
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type CarModelType = mongoose.Document;

export const CarModel =  mongoose.model<CarModelType>("Cars", carSchema);