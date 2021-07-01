import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ExpressionRendered } from "./Expression";

@Resolver()
export default class ExpressionResolver {
    @Query(returns => ExpressionRendered, {nullable: true})
    expression(@Arg('url') url: string): ExpressionRendered {
        return new ExpressionRendered()
    }

    @Query(returns => String, {nullable: true})
    expressionRaw(@Arg('url') url: string): String {
        return new String()
    }

    @Mutation(returns => String)
    expressionCreate(
        @Arg('content') content: string, 
        @Arg('languageAddress') languageAddress: string
    ): String {
        return new String()
    }
}