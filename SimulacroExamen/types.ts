export type Character = {
    id: string;
    name: string;
    episode: Episode[];
}
  
export type Episode = {
    id: string;
    name: string;
    characters: Character[];
}
  
export type Query = {
    character: (id: string) => Character;
    charactersByIds: (ids: string[]) => Character[];
}