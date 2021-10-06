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

    async addKnownLinkLanguageTemplates(addresses: string[]): Promise<string[]> {
        const { runtimeAddKnownLinkLanguageTemplates } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeAddKnownLinkLanguageTemplates($addresses: [String!]!) {
                runtimeAddKnownLinkLanguageTemplates(addresses: $addresses)
            }`,
            variables: { addresses }
        }))
        return runtimeAddKnownLinkLanguageTemplates 
    }

    async removeKnownLinkLanguageTemplates(addresses: string[]): Promise<string[]> {
        const { runtimeRemoveKnownLinkLanguageTemplates } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeRemoveKnownLinkLanguageTemplates($addresses: [String!]!) {
                runtimeRemoveKnownLinkLanguageTemplates(addresses: $addresses)
            }`,
            variables: { addresses }
        }))
        return runtimeRemoveKnownLinkLanguageTemplates 
    }

    async knownLinkLanguageTemplates(): Promise<string[]> {
        const { runtimeKnownLinkLanguageTemplates } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query runtimeKnownLinkLanguageTemplates {
                runtimeKnownLinkLanguageTemplates
            }`,
        }))
        return runtimeKnownLinkLanguageTemplates
    }

    async addFriends(dids: string[]): Promise<string[]> {
        const { runtimeAddFriends } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeAddFriends($dids: [String!]!) {
                runtimeAddFriends(dids: $dids)
            }`,
            variables: { dids }
        }))
        return runtimeAddFriends 
    }

    async removeFriends(dids: string[]): Promise<string[]> {
        const { runtimeRemoveFriends } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeRemoveFriends($dids: [String!]!) {
                runtimeRemoveFriends(dids: $dids)
            }`,
            variables: { dids }
        }))
        return runtimeRemoveFriends 
    }

    async friends(): Promise<string[]> {
        const { runtimeFriends } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query runtimeFriends {
                runtimeFriends
            }`,
        }))
        return runtimeFriends
    }

    async hcAgentInfos(): Promise<String> {
        const { runtimeHcAgentInfos } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query runtimeHcAgentInfos {
                runtimeHcAgentInfos
            }`,
        }))
        return runtimeHcAgentInfos
    }

    async hcAddAgentInfos(agentInfos: String): Promise<void> {
        const { runtimeHcAddAgentInfos } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation runtimeHcAddAgentInfos($agentInfos: String!) {
                runtimeHcAddAgentInfos(agentInfos: $agentInfos)
            }`,
            variables: { agentInfos }
        }))
        return runtimeHcAddAgentInfos
    }

    async verifyStringSignedByDid(did: string, didSigningKeyId: string, data: string, signedData: string): Promise<boolean> {
        const { runtimeVerifyStringSignedByDid } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`query runtimeVerifyStringSignedByDid($did: String!, $didSigningKeyId: String!, $data: String!, $signedData: String!) {
                runtimeVerifyStringSignedByDid(did: $did, didSigningKeyId: $didSigningKeyId, data: $data, signedData: $signedData)
            }`,
            variables: { did, didSigningKeyId, data, signedData }
        }))
        return runtimeVerifyStringSignedByDid
    }
}