import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LanguageRef {
    @Field()
    address: string;

    @Field()
    name: string;
}