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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Perspective_1 = require("../perspectives/Perspective");
const Agent_1 = __importDefault(require("./Agent"));
let AgentResolver = class AgentResolver {
    getThisAgent() {
        return new Agent_1.default("", new Perspective_1.Perspective);
    }
    getAgentByDID(did) {
        return new Agent_1.default("", new Perspective_1.Perspective);
    }
    updateAgentPerspective(perspective) {
    }
};
__decorate([
    type_graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Agent_1.default)
], AgentResolver.prototype, "getThisAgent", null);
__decorate([
    type_graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Agent_1.default)
], AgentResolver.prototype, "getAgentByDID", null);
__decorate([
    type_graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Perspective_1.Perspective]),
    __metadata("design:returntype", void 0)
], AgentResolver.prototype, "updateAgentPerspective", null);
AgentResolver = __decorate([
    type_graphql_1.Resolver()
], AgentResolver);
exports.default = AgentResolver;
