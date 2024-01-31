import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

import { resolvers } from "./resolvers/Query.ts";
import typedefs from "./gpl/schema.ts";

try{
  const server = new ApolloServer({ typeDefs: typedefs, resolvers })
  const {url} = await startStandaloneServer(server)
  console.log(`🚀 Funcionando en ${url}`)

}catch(e){
  console.log(e);
}