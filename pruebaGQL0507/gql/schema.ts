export const typeDefs = `#graphql
    type Query {
        listaContactos: [Contacto!]!
        infoContacto(id: ID!): Contacto!
    }

    type Mutation {
        createContact(name: String!, phone: String!) : Contacto!
        deleteContact(id: ID!): Contacto!
        updateContact(id: ID!, name: String!, phone: String!): Contacto!
    }

    type Contacto {
        id: ID!,
        name: String!,
        phone: String!,
        country: String!,
        actualTime: String!,
    }
`;