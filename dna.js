"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function dna() {
    return {
        name: 'dna',
        load: function load(id) {
            if (!id.endsWith(".dna"))
                return null;
            var base64 = fs_1.default.readFileSync(id, "base64").replace(/[\r\n]+/gm, '');
            var code = `var dna = "${base64}"; \nexport default dna;`;
            return code.trim();
        }
    };
}
exports.default = dna;
