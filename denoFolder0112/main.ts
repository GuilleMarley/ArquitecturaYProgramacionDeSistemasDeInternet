import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import {mongoose} from "mongoose"

import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
import typedefs from "./gql/schema.ts";
import { Person } from "./resolvers/Person.ts";
import { City } from "./resolvers/City.ts";

const resolvers = {
 Query,
 Mutation,
}

try{
  const MONGO_URL = Deno.env.get("MONGO_URL")

  if(!MONGO_URL) {
    console.log("MONGO_URL is requiered")
    Deno.exit(1)
  }

  await mongoose.connect(MONGO_URL)
  console.log("connected to MongoDb")
  
  const server = new ApolloServer({ typeDefs: typedefs, resolvers })
  const {url} = await startStandaloneServer(server)
  console.log(`🚀 Funcionando en ${url}`)

}catch(e){
  console.log(e);
}
