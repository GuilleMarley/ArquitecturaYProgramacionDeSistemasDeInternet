import { GraphQLError } from "graphql"
import { Character, Episode } from "../types.ts";

export const Query = {
    character: async (_:unknown, args: {id: ID}) => {
        try{
            const urlApiIndividual = "https://rickandmortyapi.com/api/character/"+args.id.toString();
            //console.log(urlApiIndividual);
            
            if(!urlApiIndividual){
                throw new GraphQLError("No va la url")
            }
            const characterResponse = await fetch(urlApiIndividual);
            const jsonCharacter = await characterResponse.json();
            if(!jsonCharacter){
                throw new GraphQLError("No existe esa persona");
            }

            //console.log(jsonCharacter.origin.url + " ---------------1----------------");
            
            const episodes = await Promise.all(
                jsonCharacter.episode.map(async(episode:string) => {
                    const episodeResponse = await fetch(episode);
                    const episodeData = await episodeResponse.json();

                    return episodeData;
                })
            )
            //console.log(episodes);
            //console.log(jsonCharacter.origin.url);
            
            const originResponse = await fetch(jsonCharacter.origin.url)
            const originData = await originResponse.json();
            const origen = {
                id: originData.id,
                name: originData.name,
                tipo: originData.tipo,
                dimension: originData.dimension,
                residents: originData.residents,
                created: originData.created,
            }

            const locationResponse = await fetch(jsonCharacter.location.url)
            const locationData = await locationResponse.json();
            const location = {
                id: locationData.id,
                name: locationData.name,
                tipo: locationData.tipo,
                dimension: locationData.dimension,
                residents: locationData.residents,
                created: locationData.created,
            }

            //console.log(origen);
            //console.log(location);

            const character:Character = {
                id: jsonCharacter.id,
                name: jsonCharacter.name,
                status: jsonCharacter.status,
                species: jsonCharacter.species,
                tipo: jsonCharacter.tipo,
                gender: jsonCharacter.gender,
                origin: origen,
                location: location,
                image: jsonCharacter.image,
                episode: episodes,
                created: jsonCharacter.created,
            }
            return character;

        } catch(Error){
            throw new GraphQLError(Error);
        }
    },
    /*charactersByIds:async (_:unknown, args: {ids: [ID]}) => {
        try{
            const urlApiColectivo = "https://rickandmortyapi.com/api/character/"+args.ids;
            console.log(urlApiColectivo);
            
            if(!urlApiColectivo){
                throw new GraphQLError("No va la url")
            }
            const characterResponse = await fetch(urlApiColectivo);
            const jsonCharacter = await characterResponse.json();
            if(!jsonCharacter){
                throw new GraphQLError("No existe esa persona");
            }

            //console.log(jsonCharacter.origin.url + " ---------------1----------------");
            
            const episodes = await Promise.all(
                jsonCharacter.episode.map(async(episode:string) => {
                    const episodeResponse = await fetch(episode);
                    const episodeData = await episodeResponse.json();

                    return episodeData;
                })
            )
            //console.log(episodes);
            console.log(jsonCharacter.origin.url);
            
            const originResponse = await fetch(jsonCharacter.origin.url)
            const originData = await originResponse.json();
            const origen = {
                id: originData.id,
                name: originData.name,
                tipo: originData.tipo,
                dimension: originData.dimension,
                residents: originData.residents,
                created: originData.created,
            }

            const locationResponse = await fetch(jsonCharacter.location.url)
            const locationData = await locationResponse.json();
            const location = {
                id: locationData.id,
                name: locationData.name,
                tipo: locationData.tipo,
                dimension: locationData.dimension,
                residents: locationData.residents,
                created: locationData.created,
            }

            //console.log(origen);
            //console.log(location);

            const character.map((character) => {
                const person = {
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    tipo: character.tipo,
                    gender: character.gender,
                    origin: origen,
                    location: location,
                    image: character.image,
                    episode: episodes,
                    created: character.created,
                }
                
            }) 
                
            return character.map();

        } catch(Error){
            throw new GraphQLError(Error);
        }
    },*/
}