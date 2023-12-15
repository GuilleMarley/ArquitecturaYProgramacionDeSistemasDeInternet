import { PersonModel, PersonModelType } from "../db/Person.ts";
import { GraphQLError } from "graphql";

export const  Query = {
    person: async(_:unknown, args: {id: string}):Promise<PersonModelType> => {
        try{
        const person = await PersonModel.findById(args.id);
        if(!person){ throw new GraphQLError("Person not found") }
        return person;
        }catch(err){
            throw new GraphQLError(err)
        }   
    },
}