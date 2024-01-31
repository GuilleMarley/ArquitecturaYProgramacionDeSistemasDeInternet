import { ContactModel } from "../db/Contacts.ts";
//import { getLocationFromZipAndCountry, getLocalData } from "../lib/worldweather.ts";

export const Mutation = {
    createContact: async (_parent: unknown, args: { contact: ContactInput }) => {
        const { dni, name, email, cp, isoCountryCode } = args.contact;

        // ... (Your existing validation logic goes here)

        // check if dni already exists
        const exists = await ContactModel.exists({ dni });
        if (exists) {
          throw new Error("Contact already exists");
        }

        try {
          // get latitude and longitude from cp and isoCountryCode
          const { latitude, longitude } = await getLocationFromZipAndCountry(
            cp,
            isoCountryCode
          );

          // get country and city from latitude and longitude
          const { city, country } = await getLocalData(latitude, longitude);

          const contact = new ContactModel({
            dni,
            name,
            email,
            cp,
            isoCountryCode,
            country,
            city,
            latitude,
            longitude,
          });

          await contact.save();

          // return the data that is public to the client
          return {
            dni,
            name,
            email,
            cp,
            isoCountryCode,
          };
        } catch (error) {
          throw new Error(`Problema saving data to MongoDB: ${error.message}`);
        }
    },
};
