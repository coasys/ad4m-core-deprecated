import Agent from "./Agent";
export default class AgentResolver {
    getThisAgent(): Agent;
    getAgentByDID(did: string): Agent;
}
