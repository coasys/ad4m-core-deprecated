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
exports.Language = exports.Icon = void 0;
const type_graphql_1 = require("type-graphql");
let Icon = class Icon {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Icon.prototype, "code", void 0);
Icon = __decorate([
    type_graphql_1.ObjectType()
], Icon);
exports.Icon = Icon;
let Language = class Language {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Language.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Language.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Icon)
], Language.prototype, "constructorIcon", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Icon)
], Language.prototype, "iconFor", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Language.prototype, "settings", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Icon)
], Language.prototype, "settingsIcon", void 0);
Language = __decorate([
    type_graphql_1.ObjectType()
], Language);
exports.Language = Language;
