"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharingTypeFromString = exports.SharingType = void 0;
var SharingType;
(function (SharingType) {
    SharingType["Broadcast"] = "broadcast";
    SharingType["Permissionless"] = "permissionless";
    SharingType["Permissioned"] = "permissioned";
    SharingType["Holochain"] = "holochain";
    SharingType["HolochainChannel"] = "holochainChannel";
})(SharingType = exports.SharingType || (exports.SharingType = {}));
function sharingTypeFromString(str) {
    switch (str) {
        case 'broadcast':
            return SharingType.Broadcast;
        case 'permissionless':
            return SharingType.Permissionless;
        case 'permissioned':
            return SharingType.Permissioned;
        case 'holochain':
            return SharingType.Holochain;
        case 'holochainChannel':
            return SharingType.HolochainChannel;
        default:
            throw new Error(`Not a SharingType string: ${str}`);
    }
}
exports.sharingTypeFromString = sharingTypeFromString;
class SharedPerspective {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.linkLanguages = [];
        this.allowedExpressionLanguages = [];
        this.requiredExpressionLanguages = [];
    }
}
exports.default = SharedPerspective;
