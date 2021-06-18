import { ExpressionGeneric } from "../expression/Expression";
import ExpressionRef from "../expression/ExpressionRef";
import { LinkExpression } from "../links/Links";
export default class Perspective {
    links: LinkExpression[];
}
export declare type PerspectiveExpression = ExpressionGeneric<Perspective>;
export declare class PerspectiveDiff {
    additions: LinkExpression[];
    removals: LinkExpression[];
}
export declare type PerspectiveDiffExpression = ExpressionGeneric<PerspectiveDiff>;
export declare class MutatedPerspective {
    base: ExpressionRef;
    diff: PerspectiveDiff;
}
export declare type MutatedPerspectiveExpression = ExpressionGeneric<MutatedPerspective>;
