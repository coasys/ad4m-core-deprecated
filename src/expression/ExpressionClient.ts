import { ApolloClient, gql } from "@apollo/client";
import unwrapApolloResult from "../unwrapApolloResult";
import { ExpressionRendered } from "./Expression";

export default class ExpressionClient {
    #apolloClient: ApolloClient<any>

    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
    }

    async get(url: string): Promise<ExpressionRendered> {
        const { expression } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query expression($url: String!) {
                expression(url: $url) {
                    author
                    timestamp
                    data
                    language {
                        address
                    }
                    proof {
                        valid
                        invalid
                    }
                }
            }`,
            variables: { url }
        }))
        return expression
    }

    async getRaw(url: string): Promise<string> {
        const { expressionRaw } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query expressionRaw($url: String!) {
                expressionRaw(url: $url)
            }`,
            variables: { url }
        }))
        return expressionRaw
    }

    async create(content: any, languageAddress: string): Promise<string> {
        content = JSON.stringify(content)
        const { expressionCreate } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation expressionCreate($content: String!, $languageAddress: String!){
                expressionCreate(content: $content, languageAddress: $languageAddress)
            }`,
            variables: { content, languageAddress }
        }))
        return expressionCreate
    }
}