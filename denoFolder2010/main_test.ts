export type CharacterResponse = {
    name : string,
    episodes: string[],
}

export type GetCharacterAPI = {
    name: string,
    episode: string[],
}

export type GetEpisodeAPI = {
    name: string,
}