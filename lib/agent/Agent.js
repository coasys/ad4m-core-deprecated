"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics
class Agent {
    constructor(did, perspective) {
        this.did = did;
        this.perspective = perspective;
    }
}
exports.default = Agent;
