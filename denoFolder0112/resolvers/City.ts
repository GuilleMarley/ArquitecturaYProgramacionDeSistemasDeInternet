import { PersonModel, PersonModelType } from "../db/Person.ts";

export const City = {
    name: (parent: PersonModelType):string => parent.city,
    persons: async(parent: PersonModelType):Promise<PersonModelType[]> => {
        const p = await PersonModel.find({city: parent.city}).exec()
        return p
    },
}