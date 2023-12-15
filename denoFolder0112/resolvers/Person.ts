import { PersonModelType } from "../db/Person.ts";

export const Person = {
    localTime: (parent: PersonModelType):Promise<string> => {
        const city = parent.city;
        
        return new Date()
    }
}