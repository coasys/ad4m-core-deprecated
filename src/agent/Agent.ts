import { Field, ObjectType, InputType } from "type-graphql";
import { Perspective } from "../perspectives/Perspective";
import { ExpressionGeneric } from "../expression/Expression";

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
export class Agent {
    @Field()
    did: string;

    @Field(type => Perspective, {nullable: true})
    perspective?: Perspective;

    @Field({nullable: true})
    directMessageLanguage?: string;

    constructor(did: string, perspective?: Perspective) {
        this.did = did
        if(perspective) {
            this.perspective = perspective
        } else {
            this.perspective = new Perspective()
        }
    }
}

@ObjectType()
export class AgentExpression extends ExpressionGeneric(Agent) {};

@ObjectType()
export class EntanglementProof {
    @Field()
    did: string;

    @Field()
    deviceKey: string;

    @Field()
    deviceKeySignedByDid: string;

    @Field({nullable: true})
    didSignedByDeviceKey?: string;

    constructor(did: string, deviceKey: string, deviceKeySignedByDid: string, didSignedByDeviceKey?: string) {
        this.did = did;
        this.deviceKey = deviceKey;
        this.deviceKeySignedByDid = deviceKeySignedByDid;
        this.didSignedByDeviceKey = didSignedByDeviceKey;
    }
}

@InputType()
export class EntanglementProofInput {
    @Field()
    did: string;

    @Field()
    deviceKey: string;

    @Field()
    deviceKeySignedByDid: string;

    @Field()
    didSignedByDeviceKey: string;

    constructor(did: string, deviceKey: string, deviceKeySignedByDid: string, didSignedByDeviceKey: string) {
        this.did = did;
        this.deviceKey = deviceKey;
        this.deviceKeySignedByDid = deviceKeySignedByDid;
        this.didSignedByDeviceKey = didSignedByDeviceKey;
    }
}