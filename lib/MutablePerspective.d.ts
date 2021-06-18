import { ExpressionGeneric } from "./expression/Expression";
import LanguageRef from "./language/LanguageRef";
import { MutatedPerspective } from "./perspectives/Perspective";
export default class MutablePerspective {
    linkLanguage: LanguageRef;
}
export declare type MutablePerspectiveExpression = ExpressionGeneric<MutatedPerspective>;
