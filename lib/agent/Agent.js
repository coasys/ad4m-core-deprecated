"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const PerspectiveGraphQL_1 = require("../perspectives/PerspectiveGraphQL");
// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics
let Agent = class Agent {
    constructor(did, perspective) {
        this.did = did;
        this.perspective = perspective;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Agent.prototype, "did", void 0);
__decorate([
    type_graphql_1.Field(type => PerspectiveGraphQL_1.Perspective),
    __metadata("design:type", PerspectiveGraphQL_1.Perspective)
], Agent.prototype, "perspective", void 0);
Agent = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, PerspectiveGraphQL_1.Perspective])
], Agent);
exports.default = Agent;
