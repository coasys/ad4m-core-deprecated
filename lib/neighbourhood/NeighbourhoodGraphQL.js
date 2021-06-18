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
exports.NeighbourhoodExpression = void 0;
const type_graphql_1 = require("type-graphql");
const ExpressionGraphQL_1 = require("../expression/ExpressionGraphQL");
const PerspectiveGraphQL_1 = require("../perspectives/PerspectiveGraphQL");
let Neighbourhood = class Neighbourhood {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", PerspectiveGraphQL_1.MutablePerspective)
], Neighbourhood.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", PerspectiveGraphQL_1.MutablePerspective)
], Neighbourhood.prototype, "meta", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Object)
], Neighbourhood.prototype, "fixtures", void 0);
Neighbourhood = __decorate([
    type_graphql_1.ObjectType()
], Neighbourhood);
exports.default = Neighbourhood;
let NeighbourhoodExpression = class NeighbourhoodExpression extends ExpressionGraphQL_1.ExpressionGeneric() {
};
NeighbourhoodExpression = __decorate([
    type_graphql_1.ObjectType()
], NeighbourhoodExpression);
exports.NeighbourhoodExpression = NeighbourhoodExpression;
;
