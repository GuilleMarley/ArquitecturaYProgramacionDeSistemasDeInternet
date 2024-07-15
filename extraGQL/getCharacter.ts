import { Character, Episode } from "./types.ts";

export const characterInfo = {
    episodes: async(parent: Character): Promise<Array<Episode>> => {
        const episodes = await Promise.all(
            parent.episode.map(async(episode) => {
                const epResponse = await fetch(episode);
                const epData = await epResponse.json();
                return epData;
            })
        )
        return episodes;
    },
    location: async(parent: Character): Promise<Location> => {
        const location = await fetch(parent.location.url);

        return location.json();
    },
    origin: async(parent: Character): Promise<Location|null> => {
        if(parent.origin){
            const origin = await fetch(parent.origin.url);
            return origin.json();
        } else {
            return null;
        }
    },
}