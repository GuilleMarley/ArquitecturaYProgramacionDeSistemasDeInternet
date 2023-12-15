import mongoose from "npm:mongoose@8.0.0"; //npmjs.com/package/mongoose
import { Dealer } from "../types.ts";

const Schema = mongoose.Schema;

const dealerSchema = new Schema(
  {
    name: {type: String, required: true},
    cars: [
        { type: String }
    ],
    allowance: {type: Boolean, required: true}
    
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type DealerModelType = mongoose.Document;

export const DealerModel = mongoose.model<DealerModelType>("Dealers", dealerSchema);