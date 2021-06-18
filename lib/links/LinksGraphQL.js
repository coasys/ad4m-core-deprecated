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
exports.LinkQuery = exports.LinkExpression = exports.Link = void 0;
const type_graphql_1 = require("type-graphql");
const ExpressionGraphQL_1 = require("../expression/ExpressionGraphQL");
let Link = class Link {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "predicate", void 0);
Link = __decorate([
    type_graphql_1.ObjectType()
], Link);
exports.Link = Link;
let LinkExpression = class LinkExpression extends ExpressionGraphQL_1.ExpressionGeneric() {
};
LinkExpression = __decorate([
    type_graphql_1.ObjectType()
], LinkExpression);
exports.LinkExpression = LinkExpression;
;
let LinkQuery = class LinkQuery {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "predicate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkQuery.prototype, "fromDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkQuery.prototype, "untilDate", void 0);
LinkQuery = __decorate([
    type_graphql_1.ObjectType()
], LinkQuery);
exports.LinkQuery = LinkQuery;
