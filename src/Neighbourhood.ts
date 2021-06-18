import { ExpressionGeneric } from "./expression/Expression";
import MutablePerspective, { MutablePerspectiveExpression } from "./MutablePerspective";

export default class Neighbourhood extends MutablePerspective {
    content: MutablePerspective
    meta: MutablePerspective
    fixtures: object
}

export type NeighbourhoodExpression = ExpressionGeneric<Neighbourhood>;