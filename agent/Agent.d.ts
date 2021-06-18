import ExpressionRef from "./ExpressionRef";
export default class Agent {
    did: string;
    perspectives: Map<string, ExpressionRef[]>;
    constructor(did: string);
}
