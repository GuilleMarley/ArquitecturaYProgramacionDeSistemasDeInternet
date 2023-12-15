import { CharacterResponse, GetCharacterAPI, GetEpisodeAPI } from "../main_test.ts"

export const getPersonajsID = async (id:string): Promise<CharacterResponse> => {
    
    const base_url = "https://rickandmortyapi.com/api/character"

    const url = `${base_url}/${id}`

    const data = await fetch(url)

    if(data.status != 200){
        throw new Error("Character not found")
    }

    const character:GetCharacterAPI = await data.json()

    const episodeNames:string[] = await Promise.all(character.episode.map( async(url) => {
        const response = await fetch(url)
        if(response.status!==200) throw new Error("Episode nnot found")
        const episode: GetEpisodeAPI = await response.json()
        return episode.name
    }))

    return {
        name: character.name,
        episodes: episodeNames
    }

}