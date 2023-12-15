const typedefs = `#graphql

type City {
    name: String!
    persons: [Person!]!
}

type Person {
    id: ID!
    name: String!
    cp: String!
    city: City!
    localTime: String!
}

type Query {
    person(id: ID!): Person!
}

type Mutation {
    addPerson(name: String!, cp: String!): Person!
    updatePerson(id: ID!, name: String, cp: String): Person!
}
`

export default typedefs