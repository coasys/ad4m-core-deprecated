import { Agent } from "../agent/AgentGraphQL";
export declare class ExpressionProof {
    signature: string;
    key: string;
    valid: boolean;
    invalid?: boolean;
}
export declare class Expression {
    author: Agent;
    timestamp: string;
    data: object;
    proof: ExpressionProof;
}
