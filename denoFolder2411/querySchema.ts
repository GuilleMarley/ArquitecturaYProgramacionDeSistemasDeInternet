// si el tipo es obligatorio se pone un signo de exclamacion
// los querys son las funciones para obtener datos no hay put, post, get o delete
export const schema = `#graphql
  type Pet {
      id: ID! 
      name: String!
      breed: String!
  }
  type Query {
      pets(breed: String): [Pet!]!
      pet(id: ID!): Pet!
      #petByBreed(breed: String!): [Pet!]!#este lo incluimos en primer query de forma opcional
  }

  type Mutation {
    addPet(name: String!, breed: String!): Pet!
    updatePet(id: ID!, name: String, breed: String): Pet!
    removePet(id: ID!): Pet!
  }
`;
