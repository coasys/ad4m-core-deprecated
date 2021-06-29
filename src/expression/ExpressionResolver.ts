import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import { Expression } from "./Expression";

@Resolver()
export default class ExpressionResolver {
    @Query(returns => Expression)
    expression(@Arg('url') url: string): Expression {
        return new Expression()
    }

    @Query(returns => String)
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