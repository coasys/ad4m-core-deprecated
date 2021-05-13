"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Links_1 = require("./Links");
const query = new Links_1.LinkQuery({
    source: 'a'
});
describe('LinkQuery', () => {
    it('can match positively', () => {
        expect(query.isMatch({
            source: 'a',
            predicate: 'b',
            target: 'c'
        })).toBe(true);
        expect(query.isMatch({
            source: 'a',
            target: 'c'
        })).toBe(true);
        expect(query.isMatch({
            source: 'a',
            predicate: 'b',
            target: 'c'
        })).toBe(true);
    });
    it('can match negatively', () => {
        expect(query.isMatch({
            source: 'c',
            predicate: 'b',
            target: 'c'
        })).toBe(false);
        expect(query.isMatch({
            source: 'c',
            target: 'b'
        })).toBe(false);
    });
});
