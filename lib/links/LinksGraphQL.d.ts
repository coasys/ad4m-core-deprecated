import { Agent } from "../agent/AgentGraphQL";
export declare class Link {
    code: string;
}
export declare class LinkQuery {
    code: string;
}
export declare class AddLinkInput {
    perspectiveUUID: string;
    link: string;
}
export declare class UpdateLinkInput {
    perspectiveUUID: string;
    oldLink: string;
    newLink: string;
}
export declare class RemoveLinkInput {
    perspectiveUUID: string;
    link: string;
}
export declare class LinkExpression {
    author: Agent;
    timestamp: string;
    data: Link;
}
