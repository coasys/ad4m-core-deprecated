import { Field, ObjectType } from "type-graphql";
import { ExpressionGeneric } from "../expression/Expression";
import LanguageRef from "../language/LanguageRef";
import Perspective from "../perspectives/Perspective";


@ObjectType()
export default class Neighbourhood {
    @Field()
    linkLanguage: LanguageRef

    @Field()
    meta: Perspective
}

@ObjectType()
export class NeighbourhoodExpression extends ExpressionGeneric(Neighbourhood) {};
