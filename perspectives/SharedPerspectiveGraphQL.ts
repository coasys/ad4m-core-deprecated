import { Field, ObjectType, registerEnumType } from "type-graphql";
import { SharingType } from "./SharedPerspective";
import { LanguageRef } from "../language/LanguageRefGraphQL";

registerEnumType(SharingType, {
    name: "SharedPerspective type",
});

@ObjectType()
export class SharedPerspective {
    @Field()
    name: string
    
    @Field()
    description: string
    
    @Field()
    type: SharingType
    
    @Field()
    linkLanguages: LanguageRef[]
    
    @Field()
    allowedExpressionLanguages: string[]
    
    @Field()
    requiredExpressionLanguages: string[]
}