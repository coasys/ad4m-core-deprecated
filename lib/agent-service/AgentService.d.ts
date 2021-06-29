import { Expression } from "../expression/Expression";
export default interface AgentService {
    readonly did: string;
    createSignedExpression(data: any): Expression;
}
