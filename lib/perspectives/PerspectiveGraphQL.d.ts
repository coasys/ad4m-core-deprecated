import { Agent } from "../agent/AgentGraphQL";
import { LanguageRef } from "../language/LanguageRefGraphQL";
import { LinkExpression } from "../links/LinksGraphQL";
export declare class Perspective {
    name: string;
    uuid: string;
    author: Agent;
    timestamp: string;
    linksSharingLanguage: string;
}
export declare class MutablePerspective {
    linkLanguage: LanguageRef;
}
declare const MutablePerspectiveExpression_base: any;
export declare class MutablePerspectiveExpression extends MutablePerspectiveExpression_base {
}
export declare class PerspectiveDiff {
    additions: LinkExpression[];
    removals: LinkExpression[];
}
declare const PerspectiveDiffExpression_base: any;
export declare class PerspectiveDiffExpression extends PerspectiveDiffExpression_base {
}
export declare class MutatedPerspective {
    base: string;
    diff: PerspectiveDiff;
}
declare const MutatedPerspectiveExpression_base: any;
export declare class MutatedPerspectiveExpression extends MutatedPerspectiveExpression_base {
}
export {};
