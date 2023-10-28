import mongoose from "npm:mongoose@7.6.3"; //npmjs.com/package/mongoose
import { MASCOTATYPE, Mascota } from "../types.ts";

const Schema = mongoose.Schema;

const mascotaSchema = new Schema(
  {
    type: { type: String, enum: MASCOTATYPE, required: true },
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type MascotaModelType = mongoose.Document & Omit<Mascota, "id">;

export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema);