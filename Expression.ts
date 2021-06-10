import DID from './DID'
export default class Expression {
    author: DID;
    timestamp: string;
    data: object;
    proof: ExpressionProof;
}

export function isExpression(e: any): boolean {
    return e && e.author && e.timestamp && e.data
}

export class ExpressionProof {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;

    constructor(sig: string, k: string) {
        this.key = k
        this.signature = sig
    }
}