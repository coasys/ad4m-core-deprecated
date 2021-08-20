import { ApolloClient, gql } from "@apollo/client"
import unwrapApolloResult from "../unwrapApolloResult"

export default class RuntimeClient {
    #apolloClient: ApolloClient<any>

    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
    }

    async quit(): Promise<Boolean> {
        const result = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeQuit { runtimeQuit }`
        }))

        return result.runtimeQuit
    }

    async openLink(url: string): Promise<Boolean> {
        const { runtimeOpenLink } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeOpenLink($url: String!) {
                runtimeOpenLink(url: $url)
            }`,
            variables: { url }
        }))
        return runtimeOpenLink
    }

    async addTrustedAgents(agents: string[]): Promise<string[]> {
        const { addTrustedAgents } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation addTrustedAgents($agents: [String!]!) {
                addTrustedAgents(agents: $agents)
            }`,
            variables: { agents }
        }))
        return addTrustedAgents 
    }

    async deleteTrustedAgents(agents: string[]): Promise<string[]> {
        const { deleteTrustedAgents } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation deleteTrustedAgents($agents: [String!]!) {
                deleteTrustedAgents(agents: $agents)
            }`,
            variables: { agents }
        }))
        return deleteTrustedAgents 
    }

    async getTrustedAgents(): Promise<string[]> {
        const { getTrustedAgents } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query getTrustedAgents {
                getTrustedAgents
            }`,
        }))
        return getTrustedAgents
    }
}