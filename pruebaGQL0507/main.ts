import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./gql/schema.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

// Conectar a MongoDB
const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}
await mongoose.connect(MONGO_URL);

export const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;

console.info("🚀 Connected to MongoDB");

// Configurar Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: [
    Query,
    Mutation
  ],
  
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.info(`🚀 Server ready at ${url}`);