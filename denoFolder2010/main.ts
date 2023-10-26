import express, {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"

import { getPersonajsID } from "./resolvers/getPersonajesID.ts";
import { PersonModel } from "./db/Person.ts";

const app = new express()
app.use(express.json())

app.get("/test", (_req: Request, res: Response) => {

    res.send("Hola mundo")

}).get("/ruta/:a/:b", (req: Request, res: Response) => {
    //const a = req.params.a
    //const b = req.params.b
    const{a,b} = req.params
    res.send(`Hola ${a} ${b}`)
}).get("/personajes/:id", async(req:Request, res:Response) => {
    try{
    const id = req.params.id
    const personaje = await getPersonajsID(id)
    res.send(personaje)
    } catch(e) {
        res.status(500).send(e)
    }
}).post("/addPerson",async (req: Request, res: Response) => {
    const person = req.body
    if(!person.name || !person.age){
        res.status(403).send()
        return
    }

    const existe = await PersonModel.findOne({name: person.name}).exec()
    if(existe){
        res.status(403).send()
        console.log("Error 403")
        return
    }

    const nuevaPersona = await PersonModel.create({name:person.name, age: person.age})
    res.send({
        name: nuevaPersona.name,
        age: nuevaPersona.age,
        id: nuevaPersona.id
    })
})

await mongoose.connect("LinkAlCluster")

app.listen(3000)