import { ContactModel } from "../db/Contacts.ts"

export const Query = {
    contacts: async (_parent: unknown, args: {dni: string}) => {
        const {dni} = args
        
        const contact = await ContactModel.find({dni})
        if(!contact){
            throw new Error("Contact not found")
        }
        return contact
    }

}