import Agent from './Agent';
export default class Expression {
    author: Agent;
    timestamp: string;
    data: object;
    proof: ExpressionProof;
    constructor();
}
export declare function isExpression(e: any): boolean;
export declare class ExpressionProof {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;
    constructor(sig: string, k: string);
}
