import { Field, ObjectType } from "type-graphql";
import DID from "../DID";
import { ExpressionGeneric } from "../expression/Expression";
import LanguageRef from "../language/LanguageRef";


@ObjectType()
export default class MutablePerspective {
    @Field()
    linkLanguage: LanguageRef
}

@ObjectType()
export class NeighbourhoodExpression extends ExpressionGeneric<MutablePerspective>() {};
