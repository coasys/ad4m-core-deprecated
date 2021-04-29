import type Address from './Address';
import LanguageRef from './LanguageRef';
export default class ExpressionRef {
    language: LanguageRef;
    expression: Address;
    constructor(lang: LanguageRef, expr: Address);
}
export declare function exprRef2String(ref: ExpressionRef): string;
export declare function parseExprURL(url: string): ExpressionRef;
