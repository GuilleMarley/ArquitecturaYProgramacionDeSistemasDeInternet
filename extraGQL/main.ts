import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/query.ts";

const server = new ApolloServer ({
  typeDefs,
  resolvers: {
    Query
  }
})

const { url } = await startStandaloneServer(server)
console.info(`Server ready at ${url}`)