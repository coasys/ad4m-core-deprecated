"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import reflect-get
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const AgentResolver_1 = __importDefault(require("./agent/AgentResolver"));
const schema = type_graphql_1.buildSchema({
    resolvers: [AgentResolver_1.default],
    emitSchemaFile: {
        path: __dirname + './schema.gql',
        commentDescriptions: true
    }
});
