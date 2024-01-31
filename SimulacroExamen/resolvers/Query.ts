import { Character, Episodes } from "../types.ts"

export const resolvers = {
  Query: {
    character: (_, { id }) => fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json()),
    charactersByIds: (_, { ids }) => Promise.all(
      ids.map(id => fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json()))
    ),
  },
  Character: {
    episode: (character) => Promise.all(
      character.episode.map(url => fetch(url).then(response => response.json()))
    ),
  },
  Episode: {
    characters: (episode) => Promise.all(
      episode.characters.map(url => fetch(url).then(response => response.json()))
    ),
  },
};