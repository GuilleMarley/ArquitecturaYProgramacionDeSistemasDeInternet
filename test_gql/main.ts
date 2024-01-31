import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import {mongoose} from "mongoose"

import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import typeDefs from "./gql/schema.ts";

export const NINJA_KEY = Deno.env.get("NINJA_KEY")
const resolvers = {
 Query,
 Mutation,
}

try{
  const MONGO_URL = Deno.env.get("MONGO_URL")

  if(!MONGO_URL) {
    console.log("MONGO_URL is required")
    Deno.exit(1)
  }

  await mongoose.connect(MONGO_URL)
  console.log("connected to MongoDb")
  
  const server = new ApolloServer({ typeDefs: typeDefs, resolvers })
  const {url} = await startStandaloneServer(server)
  console.log(`🚀 Funcionando en ${url}`)

}catch(e){
  console.log(e);
}
