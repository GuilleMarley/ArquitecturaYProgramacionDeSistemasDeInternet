import express, {Request, Response} from "npm:express@4.18.2"

import {
    getDataName,
    getDataAllName,
    getDataAllLocation,
    getDataLocation,
    arrLcts,
    arrPjs,
} from "./rickcode.ts"

const app = express()

app.get("/pj/:id", async (req: Request, res: Response)=> {

    const id = req.params.id
    
    try{

        if(isNaN(parseInt(id))){//isNaN = is not a number
           res.status(400).send("El id tiene que ser numero")
           return 
        }
        
        const character = await getDataName(id)
        res.send(character)
        console.log(arrPjs)
        /*const arrPjsMapped = arrPjs.map(p => p.id).some(p => p ==id)
        console.log(arrPjsMapped)
        console.log(id)
        if(!arrPjsMapped){
            console.log("arrPjsMapped")
        }*/

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/pg/:page", async (req:Request, res: Response) => {
    
    const page = req.params.page

    try{

        if(page < 0){
            res.status(400).send("La pagina no puede ser negativa.")
        }

        const list = await getDataAllName(page)
        res.send(list)
         
    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }
}).get("/lc/:page", async (req:Request, res: Response) => {
    
    const page = req.params.page

    try{

        if(page < 0){
            res.status(400).send("La pagina no puede ser negativa.")
        }

        const list = await getDataAllLocation(page)
        res.send(list)
         
    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }
}).get("/location/:id", async (req: Request, res: Response)=> {

    const id = req.params.id

    try{
        
        if(isNaN(parseInt(id))){//isNaN = is not a number
            res.status(400).send("El id tiene que ser numero")
            return 
         }
          
        const character = await getDataLocation(id)
        res.send(character)

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/genderFilter/:gender",(req: Request, res: Response)=> {

    let gender = req.params.gender
    if(gender == "male"){
        gender = "Male"
    } else if (gender == "female"){
        gender = "Female"
    }
    
    try{
        console.log("\nArray completo:\n")
        console.log(arrPjs)
        console.log("\nArray filtrado:\n")
        console.log(arrPjs.filter(f => f.gender === gender))
        res.send(arrPjs.filter(f => f.gender === gender))

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/statusFilter/:status",(req: Request, res: Response)=> {

    let status = req.params.status
    if(status == "dead"){
        status = "Dead"
    } else if (status == "alive"){
        status = "Alive"
    }
    
    try{
        console.log("\nArray completo:\n")
        console.log(arrPjs)
        console.log("\nArray filtrado:\n")
        console.log(arrPjs.filter(f => f.status === status))
        res.send(arrPjs.filter(f => f.status === status))

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/typeFilter/:type",(req: Request, res: Response)=> {

    const type = req.params.type
    
    try{
        console.log("\nArray completo:\n")
        console.log(arrLcts)
        console.log("\nArray filtrado:\n")
        console.log(arrLcts.filter(f => f.type === type))
        res.send(arrLcts.filter(f => f.type === type))

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/dimensionFilter/:dimension",(req: Request, res: Response)=> {

    const dimension = req.params.dimension
    
    try{
        console.log("\nArray completo:\n")
        console.log(arrLcts)
        console.log("\nArray filtrado:\n")
        console.log(arrLcts.filter(f => f.dimension === dimension))
        res.send(arrLcts.filter(f => f.dimension === dimension))

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/borrarPj/:id",(req: Request, res: Response)=> {

    const id = req.params.id

    try{
        
        if(isNaN(parseInt(id))){//isNaN = is not a number
            res.status(400).send("El id tiene que ser numero")
            return 
        }

        console.log("\nArray completo:\n")
        console.log(arrPjs)

        if(!arrPjs.map(p => p.id).some(p => p == id)){
            res.send("No hay personajes con ese id")
            return
        }

        const arrPjsMapped = arrPjs.map(p => p.id)
        const pos = arrPjsMapped.indexOf(parseInt(id))
        if(pos == -1){
            res.send("Ese personaje no esta en el array")
            return
        }
        arrPjs.splice(pos, 1)
        console.log(arrPjs)
        res.send(arrPjs)
        //console.log(pos)

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

}).get("/borrarLc/:id",(req: Request, res: Response)=> {

    const id = req.params.id

    try{

        if(isNaN(parseInt(id))){//isNaN = is not a number
            res.status(400).send("El id tiene que ser numero")
            return 
        }

        console.log("\nArray completo:\n")
        console.log(arrLcts)

        if(!arrLcts.map(p => p.id).some(p => p == id)){
            res.send("No hay localizaciones con ese id")
            return
        }

        const arrLctsMapped = arrLcts.map(p => p.id)
        const pos = arrLctsMapped.indexOf(parseInt(id))
        if(pos == -1){
            res.send("Esa localizacion no esta en el array")
            return
        }
        arrLcts.splice(pos, 1)
        console.log(arrLcts)
        res.send(arrLcts)

    } catch(e){
        console.log(e)
        res.status(500).send("Error")
    }

})

app.listen(3000);