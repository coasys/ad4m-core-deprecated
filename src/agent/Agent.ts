import { Field, ObjectType } from "type-graphql";
import { Perspective } from "../perspectives/PerspectiveGraphQL";

// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics
@ObjectType()
export default class Agent {
    @Field()
    did: String;

    @Field(type => Perspective)
    perspective: Perspective;

    constructor(did: string, perspective: Perspective) {
        this.did = did
        this.perspective = perspective
    }
}
