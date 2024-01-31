//Esto es para apollo server
const typeDefs = `#graphql

    type Contact {
        dni: String!
        name: String!
        email: String!
        cp: String!
        isoCountryCode: String!
        country: String!
        city: String!
        weather: String!
        localTime: String!
        latitude: String!
        longitude: String!
    }

    type Query {
        contacts(dni: String!): Contact!
    }

    type Mutation {
        createContact(contact: Contact!): Contact!
    }
`;

export default typeDefs;
