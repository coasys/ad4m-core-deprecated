import { ApolloClient } from "@apollo/client";
import { Link } from "../links/Links";
import { ExpressionProof, ExpressionRendered } from "./Expression";
import { ExpressionRef } from "./ExpressionRef";

export default class ExpressionClient {
    #apolloClient: ApolloClient<any>
    #testExpression: ExpressionRendered

    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        const e = new ExpressionRendered()
        e.author = 'did:ad4m:test'
        e.timestamp = Date.now().toString()
        e.proof = new ExpressionProof('', '')
        e.data = JSON.stringify({ type: 'test expression', content: 'test'})

        this.#testExpression = e
    }

    get(url: string): ExpressionRendered {
        if(url === 'neighbourhood://Qm123') {
            return this.#testExpression
        } else {
            return null
        }
    }

    getRaw(url: string): String {
        if(url === 'neighbourhood://Qm123') {
            return JSON.stringify(this.#testExpression)
        } else {
            return null
        }
    }

    create(content: string, languageAddress: string
    ): String {
        return new String("Qm1234")
    }
}