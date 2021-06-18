import DID from "./DID";
import { ExpressionGeneric } from "./Expression";
import LanguageRef from "./LanguageRef";
import { MutatedPerspective } from "./Perspective";

export default class MutablePerspective {
    linkLanguage: LanguageRef
}

export type MutablePerspectiveExpression = ExpressionGeneric<MutatedPerspective>;
