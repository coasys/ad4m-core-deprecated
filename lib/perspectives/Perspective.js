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
exports.MutatedPerspectiveExpression = exports.MutatedPerspective = exports.PerspectiveDiffExpression = exports.PerspectiveDiff = exports.PerspectiveExpression = void 0;
const type_graphql_1 = require("type-graphql");
const Expression_1 = require("../expression/Expression");
const ExpressionRef_1 = __importDefault(require("../expression/ExpressionRef"));
const Links_1 = require("../links/Links");
// A Perspective represents subjective meaning, encoded through
// associations between expressions, a.k.a. Links, that is a graph
// over the objective Expressions of any subset of Languages.
let Perspective = class Perspective {
};
__decorate([
    type_graphql_1.Field(type => [Links_1.LinkExpression]),
    __metadata("design:type", Array)
], Perspective.prototype, "links", void 0);
Perspective = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], Perspective);
exports.default = Perspective;
let PerspectiveExpression = class PerspectiveExpression extends Expression_1.ExpressionGeneric(Perspective) {
};
PerspectiveExpression = __decorate([
    type_graphql_1.ObjectType()
], PerspectiveExpression);
exports.PerspectiveExpression = PerspectiveExpression;
;
let PerspectiveDiff = class PerspectiveDiff {
};
__decorate([
    type_graphql_1.Field(type => [Links_1.LinkExpression]),
    __metadata("design:type", Array)
], PerspectiveDiff.prototype, "additions", void 0);
__decorate([
    type_graphql_1.Field(type => [Links_1.LinkExpression]),
    __metadata("design:type", Array)
], PerspectiveDiff.prototype, "removals", void 0);
PerspectiveDiff = __decorate([
    type_graphql_1.ObjectType()
], PerspectiveDiff);
exports.PerspectiveDiff = PerspectiveDiff;
let PerspectiveDiffExpression = class PerspectiveDiffExpression extends Expression_1.ExpressionGeneric(PerspectiveDiff) {
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
    __metadata("design:type", ExpressionRef_1.default)
], MutatedPerspective.prototype, "base", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", PerspectiveDiff)
], MutatedPerspective.prototype, "diff", void 0);
MutatedPerspective = __decorate([
    type_graphql_1.ObjectType()
], MutatedPerspective);
exports.MutatedPerspective = MutatedPerspective;
let MutatedPerspectiveExpression = class MutatedPerspectiveExpression extends Expression_1.ExpressionGeneric(MutatedPerspective) {
};
MutatedPerspectiveExpression = __decorate([
    type_graphql_1.ObjectType()
], MutatedPerspectiveExpression);
exports.MutatedPerspectiveExpression = MutatedPerspectiveExpression;
;
