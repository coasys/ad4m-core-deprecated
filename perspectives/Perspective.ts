import { ExpressionGeneric } from "../expression/Expression";
import ExpressionRef from "../expression/ExpressionRef";
import { LinkExpression } from "../links/Links";

// A Perspective represents subjective meaning, encoded through
// associations between expressions, a.k.a. Links, that is a graph
// over the objective Expressions of any subset of Languages.
export default class Perspective {
    links: LinkExpression[]
}

export type PerspectiveExpression = ExpressionGeneric<Perspective>;

export class PerspectiveDiff {
    additions: LinkExpression[]
    removals: LinkExpression[]
}

export type PerspectiveDiffExpression = ExpressionGeneric<PerspectiveDiff>;

export class MutatedPerspective {
    base: ExpressionRef
    diff: PerspectiveDiff
}

export type MutatedPerspectiveExpression = ExpressionGeneric<MutatedPerspective>;
