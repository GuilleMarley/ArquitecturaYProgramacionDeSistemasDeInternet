export interface Personajes{
    id : number
    name : string
    status : string
    species : string
    gender : string
    origin : Origen
    location : Localizacion
    created : string
}

export interface Origen {
    name: string
    url: string
}

export interface Localizacion {
    name: string
    url: string
}

export interface Pagination {
    count: string
    pages: string
    next: string
    prev: string
}

export interface Location {
    id: number
    name: string
    type: string
    dimension: string
    created: string
}

export const arrPjs: Personajes[] = [];
export const arrLcts: Location[] = [];

export const getDataName = async (personaje: string|number): Promise<Personajes> => {

    const base_url = "https://rickandmortyapi.com/api/character"

    const url = `${base_url}/${personaje}`

    const data = await fetch(url)

    if(data.status != 200){
        throw new Error("Bad request")
    }

    const json = await data.json()
    const id = json.id
    const name = json.name
    const status = json.status
    const species = json.species
    const gender = json.gender
    const origin = json.origin.name
    const location = json.location.name
    const created = json.created
    let nuevoPersonaje:Personajes

    arrPjs.push(nuevoPersonaje = {
        id,
        name,
        status ,
        species ,
        gender ,
        origin ,
        location ,
        created ,
    })
    console.log("Personaje añadido")

    return {
        id,
        name,
        status,
        species,
        gender,
        origin,
        location,
        created
    }

}

export const getDataAllName = async (page: string|number): Promise<Personajes> => {

    const base_url = "https://rickandmortyapi.com/api/character/?page="

    const url = `${base_url}${page}`

    const data = await fetch(url)

    if(data.status != 200){
        throw new Error("Bad request")
    }

    const json = await data.json()
    const names = json.results.map((results) => results.name)

    return names
    }

    export const getDataLocation =async (localizacion: string|number) => {
        const base_url = "https://rickandmortyapi.com/api/location"

        const url = `${base_url}/${localizacion}`
    
        const data = await fetch(url)
    
        if(data.status != 200){
            throw new Error("Bad request")
        }
    
        const json = await data.json()
        const id = json.id
        const name = json.name
        const type = json.type
        const dimension = json.dimension
        const created = json.created
        let nuevaLocalizacion:Localizacion
        
        arrLcts.push(nuevaLocalizacion = {
            id,
            name,
            type,
            dimension,
            created,
        })
    
        return {
            id,
            name,
            type,
            dimension,
            created
        }
    }

    export const getDataAllLocation = async (page: string|number): Promise<Personajes> => {

        const base_url = "https://rickandmortyapi.com/api/location/?page="
    
        const url = `${base_url}${page}`
    
        const data = await fetch(url)
    
        if(data.status != 200){
            throw new Error("Bad request")
        }
    
        const json = await data.json()
        const names = json.results.map((results) => results.name)
    
        return names
        }