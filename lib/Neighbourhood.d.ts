import { ExpressionGeneric } from "./expression/Expression";
import MutablePerspective from "./MutablePerspective";
export default class Neighbourhood extends MutablePerspective {
    content: MutablePerspective;
    meta: MutablePerspective;
    fixtures: object;
}
export declare type NeighbourhoodExpression = ExpressionGeneric<Neighbourhood>;
