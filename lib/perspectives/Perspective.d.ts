import ExpressionRef from "../expression/ExpressionRef";
import { LinkExpression } from "../links/Links";
export declare class Perspective {
    links: LinkExpression[];
}
declare const PerspectiveExpression_base: any;
export declare class PerspectiveExpression extends PerspectiveExpression_base {
}
export declare class PerspectiveDiff {
    additions: LinkExpression[];
    removals: LinkExpression[];
}
declare const PerspectiveDiffExpression_base: any;
export declare class PerspectiveDiffExpression extends PerspectiveDiffExpression_base {
}
export declare class MutatedPerspective {
    base: ExpressionRef;
    diff: PerspectiveDiff;
}
declare const MutatedPerspectiveExpression_base: any;
export declare class MutatedPerspectiveExpression extends MutatedPerspectiveExpression_base {
}
export {};
