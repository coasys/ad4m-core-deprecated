//import reflect-get
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AgentResolver from "./agent/AgentResolver";
import NeighbourhoodResolver from "./neighbourhood/NeighbourhoodResolver";
import PerspectiveResolver from "./perspectives/PerspectiveResolver";

const schema = buildSchema({
    resolvers: [AgentResolver, PerspectiveResolver, NeighbourhoodResolver],
    emitSchemaFile: {
        path: __dirname + '/schema.gql',
        commentDescriptions: true
    }
})