import DID from '../DID';
export declare class ExpressionGeneric<Type> {
    author: DID;
    timestamp: string;
    data: Type;
    proof: ExpressionProof;
}
declare type Expression = ExpressionGeneric<object>;
export default Expression;
export declare function isExpression(e: any): boolean;
export declare class ExpressionProof {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;
    constructor(sig: string, k: string);
}
