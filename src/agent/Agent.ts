import { Field, ObjectType } from "type-graphql";
import LanguageRef from "../language/LanguageRef";
import Perspective from "../perspectives/Perspective";

// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics.
// This should be used for any kind of user profile information.
//
// 3. A reference to the direct message language via which the agent
// is able to receive DMs.
@ObjectType()
export default class Agent {
    @Field()
    did: String;

    @Field(type => Perspective, {nullable: true})
    perspective: Perspective;

    @Field({nullable: true})
    directMessageLanguage: LanguageRef

    constructor(did: string, perspective: Perspective) {
        this.did = did
        this.perspective = perspective
    }
}
