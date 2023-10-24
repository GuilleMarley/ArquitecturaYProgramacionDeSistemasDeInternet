import mongoose from "npm:mongoose@7.6.3"

export type PersonModelType = {
    _id: mongoose.ObjectId,
    name: string,
    age: number,
}

const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: String,
    age: Number,
})

export const PersonModel = mongoose.model<PersonModelType>('person', PersonSchema)