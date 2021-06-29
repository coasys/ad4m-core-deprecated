//import reflect-get
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AgentResolver from "./agent/AgentResolver";
import PerspectiveResolver from "./perspectives/PerspectiveResolver";

const schema = buildSchema({
    resolvers: [AgentResolver, PerspectiveResolver],
    emitSchemaFile: {
        path: __dirname + '/schema.gql',
        commentDescriptions: true
    }
})