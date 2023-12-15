import { PersonModel } from "../db/Person.ts";
import { PersonModelType } from "../db/Person.ts";
import { GraphQLError } from "graphql";

export const Mutation = {
    addPerson: async(_:unknown, args: {name: string, cp: string}):Promise<PersonModelType> => {
        const {name, cp} = args;
        const person = new PersonModel({name, cp});
        await person.save();
        return person;
    },
    updatePerson: async(_:unknown, args: {id: string, name: string, cp: string}):Promise<PersonModelType> => {
        const {id, name, cp} = args;
        const person = await PersonModel.findById(id);
        if(!person){ throw new GrraphQLError("Person not found") }
        person.name = name || person.name;
        person.cp = cp || person.cp;
        await person.save();
        return person;
    },
}