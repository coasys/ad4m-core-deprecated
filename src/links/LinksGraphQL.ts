import { Field, ObjectType } from "type-graphql";
import { ExpressionGeneric } from "../expression/ExpressionGraphQL";

@ObjectType()
export class Link {
    @Field()
    source: string;

    @Field()
    target: string;

    @Field({nullable: true})
    predicate?: string;
}

@ObjectType()
export class LinkExpression extends ExpressionGeneric<Link>() {};

@ObjectType()
export class LinkQuery {
    @Field({nullable: true})
    source?: string;

    @Field({nullable: true})
    target?: string;
    
    @Field({nullable: true})
    predicate?: string;
    
    @Field({nullable: true})
    fromDate?: Date;
    
    @Field({nullable: true})
    untilDate?: Date;
}
