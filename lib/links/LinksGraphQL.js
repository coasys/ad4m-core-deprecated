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
exports.LinkExpression = exports.RemoveLinkInput = exports.UpdateLinkInput = exports.AddLinkInput = exports.LinkQuery = exports.Link = void 0;
const type_graphql_1 = require("type-graphql");
const AgentGraphQL_1 = require("../agent/AgentGraphQL");
let Link = class Link {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "code", void 0);
Link = __decorate([
    type_graphql_1.ObjectType()
], Link);
exports.Link = Link;
let LinkQuery = class LinkQuery {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LinkQuery.prototype, "code", void 0);
LinkQuery = __decorate([
    type_graphql_1.ObjectType()
], LinkQuery);
exports.LinkQuery = LinkQuery;
let AddLinkInput = class AddLinkInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddLinkInput.prototype, "perspectiveUUID", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddLinkInput.prototype, "link", void 0);
AddLinkInput = __decorate([
    type_graphql_1.ObjectType()
], AddLinkInput);
exports.AddLinkInput = AddLinkInput;
let UpdateLinkInput = class UpdateLinkInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateLinkInput.prototype, "perspectiveUUID", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateLinkInput.prototype, "oldLink", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateLinkInput.prototype, "newLink", void 0);
UpdateLinkInput = __decorate([
    type_graphql_1.ObjectType()
], UpdateLinkInput);
exports.UpdateLinkInput = UpdateLinkInput;
let RemoveLinkInput = class RemoveLinkInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveLinkInput.prototype, "perspectiveUUID", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveLinkInput.prototype, "link", void 0);
RemoveLinkInput = __decorate([
    type_graphql_1.ObjectType()
], RemoveLinkInput);
exports.RemoveLinkInput = RemoveLinkInput;
let LinkExpression = class LinkExpression {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", AgentGraphQL_1.Agent)
], LinkExpression.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LinkExpression.prototype, "timestamp", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Link)
], LinkExpression.prototype, "data", void 0);
LinkExpression = __decorate([
    type_graphql_1.ObjectType()
], LinkExpression);
exports.LinkExpression = LinkExpression;
