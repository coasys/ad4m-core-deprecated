import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class LanguageMeta {
    @Field()
    name: string;

    @Field()
    address: string;

    @Field()
    description: string;

    @Field()
    author: string;

    @Field()
    templated: boolean

    @Field()
    templateSourceLanguageAddress?: string;

    @Field()
    templateAppliedParams?: string;

    @Field(type => [String])
    possibleTemplateParams?: string[];

    @Field()
    sourceCodeLink?: string;
}

@InputType()
export class LanguageMetaInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(type => [String])
    possibleTemplateParams?: string[];

    @Field()
    sourceCodeLink?: string;
}