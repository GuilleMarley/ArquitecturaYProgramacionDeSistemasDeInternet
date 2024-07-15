import { ContactModel } from "../db/contacts.ts";
import { Contacto } from "../types.ts";
import { GraphQLError} from "graphql"

export const Query = {
    listaContactos: async(_:unknown): Promise<Contacto[]> => {
        try{
            const contactos = await ContactModel.find().exec();
            if(!contactos){
                throw new GraphQLError("No people in DB");
            }
            
        }
    }
}