import { ApolloClient } from '@apollo/client'
import AgentClient from './agent/AgentClient'
import { LanguageClient } from './language/LanguageClient'
import NeighbourhoodClient from './neighbourhood/NeighbourhoodClient'

export class Ad4mClient {
    #apolloClient: ApolloClient<any>
    #agentClient: AgentClient
    #languageClient: LanguageClient
    #neighbourhoodClient: NeighbourhoodClient


    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        this.#agentClient = new AgentClient(client)
        this.#languageClient = new LanguageClient(client)
        this.#neighbourhoodClient = new NeighbourhoodClient(client)
    }

    get agent(): AgentClient {
        return this.#agentClient
    }

    get languages(): LanguageClient {
        return this.#languageClient
    }

    get neighbourhood(): NeighbourhoodClient {
        return this.#neighbourhoodClient
    }
}