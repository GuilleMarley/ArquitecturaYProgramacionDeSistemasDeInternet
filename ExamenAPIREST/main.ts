import mongoose from "mongoose"
import express from "express"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"

export const NINJA_KEY = Deno.env.get("NINJA_KEY")

const env = await load()
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL")

if(!MONGO_URL){
  console.log("Proporciona una url de mongo")
  Deno.exit(1)
}

await mongoose.connect(MONGO_URL)
const app = express()
app.use(express.json())

app.get("/", )

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})