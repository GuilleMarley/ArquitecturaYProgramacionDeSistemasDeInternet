import express, {Request, Response} from "npm:express@4.18.2"

import getPlace from "./zipcode.ts";

const app = express();

app.get("/", ( req: Request, res: Response ) => {

    res.send("Funciona Mundo!");

}).get("/hola", (req: Request, res: Response) => {

    res.send("<html><body><h1>HOLA</h1></body></html>");

}).get("/saluda/:nombre", (req: Request, res: Response)=> {

    const elNombre = req.params.nombre;
    res.send(`Hola ${elNombre}`);
    
}).get("/city/:zip", async (req: Request, res: Response)=> {

    const zip = req.params.zip
    
    try{

        if(isNaN(parseInt(zip))){//isNaN = is not a number
           res.status(400).send("El zip tiene que ser un numero")
           return 
        }
        
        const place = await getPlace(zip)
        res.send(place)

    } catch(e){
        res.status(500).send("Error")
    }

})

app.listen(3000);