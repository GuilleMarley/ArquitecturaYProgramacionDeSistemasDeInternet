import mongoose from "mongoose"
import { Example } from "../types.ts"

const Schema = mongoose.Schema

const ExampleSchema = new Schema(
    {
       valor: {type: String, required: true, unique: false}
    },
    {timestamps: true}
)

export type ExampleModelType = mongoose.Document & Omit<Example,"id">

export const ExampleModel = mongoose.model<ExampleModelType>("Example", ExampleSchema)