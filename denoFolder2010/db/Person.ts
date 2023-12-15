import mongoose from "npm:mongoose@7.6.3"

export type PersonModelType = {
    _id: mongoose.ObjectId,
    name: string,
    age: number,
    dni: string,
}

const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: String,
    age: Number,
    dni:String,
})

export const PersonModel = mongoose.model<PersonModelType>('person', PersonSchema)

