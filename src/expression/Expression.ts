import DID from '../DID'
export class ExpressionGeneric<Type> {
    author: DID;
    timestamp: string;
    data: Type;
    proof: ExpressionProof;
}

type Expression = ExpressionGeneric<object>;
export default Expression

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