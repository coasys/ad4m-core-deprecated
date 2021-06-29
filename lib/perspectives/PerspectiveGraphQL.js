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
exports.MutatedPerspectiveExpression = exports.MutatedPerspective = exports.PerspectiveDiffExpression = exports.PerspectiveDiff = exports.MutablePerspectiveExpression = exports.MutablePerspective = exports.Perspective = void 0;
const type_graphql_1 = require("type-graphql");
const Agent_1 = __importDefault(require("../agent/Agent"));
const LanguageRefGraphQL_1 = require("../language/LanguageRefGraphQL");
const ExpressionGraphQL_1 = require("../expression/ExpressionGraphQL");
let Perspective = class Perspective {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Perspective.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Perspective.prototype, "uuid", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Agent_1.default)
], Perspective.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Perspective.prototype, "timestamp", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Perspective.prototype, "linksSharingLanguage", void 0);
Perspective = __decorate([
    type_graphql_1.ObjectType()
], Perspective);
exports.Perspective = Perspective;
let MutablePerspective = class MutablePerspective {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", LanguageRefGraphQL_1.LanguageRef)
], MutablePerspective.prototype, "linkLanguage", void 0);
MutablePerspective = __decorate([
    type_graphql_1.ObjectType()
], MutablePerspective);
exports.MutablePerspective = MutablePerspective;
let MutablePerspectiveExpression = class MutablePerspectiveExpression extends ExpressionGraphQL_1.ExpressionGeneric() {
};
MutablePerspectiveExpression = __decorate([
    type_graphql_1.ObjectType()
], MutablePerspectiveExpression);
exports.MutablePerspectiveExpression = MutablePerspectiveExpression;
;
let PerspectiveDiff = class PerspectiveDiff {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], PerspectiveDiff.prototype, "additions", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], PerspectiveDiff.prototype, "removals", void 0);
PerspectiveDiff = __decorate([
    type_graphql_1.ObjectType()
], PerspectiveDiff);
exports.PerspectiveDiff = PerspectiveDiff;
let PerspectiveDiffExpression = class PerspectiveDiffExpression extends ExpressionGraphQL_1.ExpressionGeneric() {
};
PerspectiveDiffExpression = __decorate([
    type_graphql_1.ObjectType()
], PerspectiveDiffExpression);
exports.PerspectiveDiffExpression = PerspectiveDiffExpression;
;
let MutatedPerspective = class MutatedPerspective {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MutatedPerspective.prototype, "base", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", PerspectiveDiff)
], MutatedPerspective.prototype, "diff", void 0);
MutatedPerspective = __decorate([
    type_graphql_1.ObjectType()
], MutatedPerspective);
exports.MutatedPerspective = MutatedPerspective;
class MutatedPerspectiveExpression extends ExpressionGraphQL_1.ExpressionGeneric() {
}
exports.MutatedPerspectiveExpression = MutatedPerspectiveExpression;
;
