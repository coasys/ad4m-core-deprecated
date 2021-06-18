import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Icon {
    @Field()
    code: string;
}

@ObjectType()
export class Language {
    @Field()
    name: String
    
    @Field()
    address: String
    
    @Field()
    constructorIcon: Icon
    
    @Field()
    iconFor: Icon
    
    @Field()
    settings: String
    
    @Field()
    settingsIcon: Icon
}