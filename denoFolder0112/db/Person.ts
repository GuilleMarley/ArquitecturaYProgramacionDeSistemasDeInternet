import mongoose from "mongoose";
import checkCP from "../controllers/checkCP.ts";
import getCityFromCP from "../controllers/getCityFromCP.ts";
import { Person } from "../types.ts";

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {type: String, required: true},
    cp: {type: String, required: true},
    city: {type: String, required: false},
});

PersonSchema.path("cp").validate(async (cp: string) => {
    return await checkCP(cp);
})

PersonSchema.pre("save", async function(next) {
    if(!this.isModified("cp")){ return next() }
    if(this!.city){ return next() }
    const cp = this!.cp
    const city = await getCityFromCP(cp);
    this!.city = city;
    next();
})

export type PersonModelType = Document & Omit<Person, "id">
export const PersonModel = mongoose.model<PersonModelType>("Person", PersonSchema);