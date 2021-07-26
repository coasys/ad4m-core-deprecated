import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LanguageRef } from "../language/LanguageRef";
import { Expression, ExpressionProof, ExpressionRendered } from "./Expression";


const e = new ExpressionRendered()
e.author = 'did:ad4m:test'
e.timestamp = Date.now().toString()
e.proof = new ExpressionProof('', '')
e.data = JSON.stringify({ type: 'test expression', content: 'test'})
e.language = new LanguageRef('test-language-address')
const testExpression = e
@Resolver()
export default class ExpressionResolver {
    @Query(returns => ExpressionRendered, {nullable: true})
    expression(@Arg('url') url: string): ExpressionRendered {
        if(url === 'neighbourhood://Qm123') {
            return testExpression
        } else {
            return null
        }
    }

    @Query(returns => String, {nullable: true})
    expressionRaw(@Arg('url') url: string): string {
        if(url === 'neighbourhood://Qm123') {
            return JSON.stringify(testExpression)
        } else {
            return null
        }
    }

    @Mutation(returns => String)
    expressionCreate(
        @Arg('content') content: string, 
        @Arg('languageAddress') languageAddress: string
    ): string {
        return "Qm1234"
    }

    @Mutation(returns => Expression)
    expressionSign(
        @Arg('expression') expression: Expression,
    ): Expression {
        return new Expression()
    }
}