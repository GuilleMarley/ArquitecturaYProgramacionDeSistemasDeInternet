import express, {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"

import getPet from "./resolvers/getPetId.ts"
import addPet from "./resolvers/addPet.ts"
import deletePet from "./resolvers/deletePet.ts"
import getPetId from "./resolvers/getPetId.ts"
import updatePet from "./resolvers/updatePet.ts"

const app = new express()
app.use(express.json())

app
.get("/api/mascotas", getPet)
.get("/api/mascotas/:id", getPetId)
.post("/api/mascotas", addPet)
.put("/api/mascotas/:id", updatePet)
.delete("/api/mascotas/:id", deletePet)

await mongoose.connect("mongodb+srv://gmartinez:1234@cluster.dipgaht.mongodb.net/?retryWrites=true&w=majority")

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})