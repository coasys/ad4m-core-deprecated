//import reflect-get
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AgentResolver from "./agent/AgentResolver";
import ExpressionResolver from "./expression/ExpressionResolver"
import LanguageResolver from "./language/LanguageResolver";
import NeighbourhoodResolver from "./neighbourhood/NeighbourhoodResolver";
import PerspectiveResolver from "./perspectives/PerspectiveResolver";

const schema = buildSchema({
    resolvers: [
        AgentResolver, 
        ExpressionResolver,
        LanguageResolver,
        NeighbourhoodResolver,
        PerspectiveResolver
    ],
    emitSchemaFile: {
        path: __dirname + '/schema.gql',
        commentDescriptions: true
    }
})