import 'reflect-metadata'
import { ApolloClient } from '@apollo/client'
import AgentClient from './agent/AgentClient'
import { LanguageClient } from './language/LanguageClient'
import NeighbourhoodClient from './neighbourhood/NeighbourhoodClient'
import PerspectiveClient from './perspectives/PerspectiveClient'
import RuntimeClient from './runtime/RuntimeClient'

export class Ad4mClient {
    #apolloClient: ApolloClient<any>
    #agentClient: AgentClient
    #languageClient: LanguageClient
    #neighbourhoodClient: NeighbourhoodClient
    #perspectiveClient: PerspectiveClient
    #runtimeClient: RuntimeClient


    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        this.#agentClient = new AgentClient(client)
        this.#languageClient = new LanguageClient(client)
        this.#neighbourhoodClient = new NeighbourhoodClient(client)
        this.#perspectiveClient = new PerspectiveClient(client)
        this.#runtimeClient = new RuntimeClient(client)
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

    get perspective(): PerspectiveClient {
        return this.#perspectiveClient
    }

    get runtime(): RuntimeClient {
        return this.#runtimeClient
    }
}