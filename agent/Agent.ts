import ExpressionRef from "./ExpressionRef";
import Perspective from "./Perspective";

// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics
export default class Agent {
    did: string;
    perspective: Perspective;

    constructor(did: string, perspective: Perspective) {
        this.did = did
        this.perspective = perspective
    }
}
