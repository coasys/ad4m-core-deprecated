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
const Neighbourhood_1 = require("../neighbourhood/Neighbourhood");
const Perspective_1 = __importDefault(require("../perspectives/Perspective"));
let SocialOrganism = class SocialOrganism {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Neighbourhood_1.NeighbourhoodExpression)
], SocialOrganism.prototype, "inner", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Perspective_1.default)
], SocialOrganism.prototype, "outer", void 0);
SocialOrganism = __decorate([
    type_graphql_1.ObjectType()
], SocialOrganism);
exports.default = SocialOrganism;
