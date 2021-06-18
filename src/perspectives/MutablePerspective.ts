import DID from "../DID";
import { ExpressionGeneric } from "../expression/Expression";
import LanguageRef from "../language/LanguageRef";
import { MutatedPerspective } from "./Perspective";

export default class MutablePerspective {
    linkLanguage: LanguageRef
}

export type MutablePerspectiveExpression = ExpressionGeneric<MutatedPerspective>;
