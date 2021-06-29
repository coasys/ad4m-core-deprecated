//import reflect-get
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AgentResolver from "./agent/AgentResolver";


const schema = buildSchema({
    resolvers: [AgentResolver],
    emitSchemaFile: {
        path: __dirname + '/schema.gql',
        commentDescriptions: true
    }
})