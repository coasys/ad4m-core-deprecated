export declare class ExpressionProof {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;
    constructor(sig: string, k: string);
}
export declare function ExpressionGeneric<Type>(): any;
declare const Expression_base: any;
export declare class Expression extends Expression_base {
}
export declare function isExpression(e: any): boolean;
export {};
