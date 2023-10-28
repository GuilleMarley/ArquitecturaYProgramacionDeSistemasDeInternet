export enum MASCOTATYPE {
    perro =  "perro",
    gato =  "gato",
    serpiente = "serpiente"
}

export type Mascota = {
    id: string,
    name: string,
    descripcion: string,
    //type: "perro" | "gato" | "serpiente",
    type: MASCOTATYPE,
 }