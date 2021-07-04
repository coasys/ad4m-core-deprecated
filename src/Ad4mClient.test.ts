import { buildSchema } from "type-graphql"
import { ApolloServer } from 'apollo-server'
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from 'cross-fetch'
import { onError } from '@apollo/link-error'
import AgentResolver from "./agent/AgentResolver"
import { Ad4mClient } from "./Ad4mClient";
import { Perspective } from "./perspectives/Perspective";
import { Link, LinkExpression } from "./links/Links";
import LanguageResolver from "./language/LanguageResolver";

jest.setTimeout(15000)

describe('Ad4mClient', () => {
    let ad4mClient
    
    beforeAll(async () => {
        const schema = await buildSchema({
            resolvers: [AgentResolver, LanguageResolver]
        })
        const server = new ApolloServer({ schema })
        const { url, subscriptionsUrl } = await server.listen()

        console.log("GraphQL server listening at:", url)

        const errorLink = onError(({ graphQLErrors }) => {
            if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(`GraphQL Error: ${message}`))
          })
          

        const apolloClient = new ApolloClient({
            link: ApolloLink.from([errorLink, new HttpLink({ uri: url, fetch})]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                    nextFetchPolicy: 'network-only'
                },
            },
        });

        console.log("GraphQL client connected")

        ad4mClient = new Ad4mClient(apolloClient)
    })

    describe('.agent', () => {
        it('agent() works', async () => {
            const agent = await ad4mClient.agent.agent()
            expect(agent.did).toBe('did:ad4m:test')
        })

        it('status() works', async () => {
            const agentStatus = await ad4mClient.agent.status()
            expect(agentStatus.did).toBe('did:ad4m:test')
            expect(agentStatus.isUnlocked).toBe(false)
        })

        it('initialize() works', async () => {
            const did = "did:test:test"
            const didDocument = "did document test"
            const keystore = "test"
            const passphrase = "secret"

            const agentStatus = await ad4mClient.agent.initialize({
                did, didDocument, keystore, passphrase
            })

            expect(agentStatus.did).toBe(did)
            expect(agentStatus.didDocument).toBe(didDocument)
            expect(agentStatus.isInitialized).toBe(true)
            expect(agentStatus.isUnlocked).toBe(true)
        })

        it('lock() works', async () => {
            const agentStatus = await ad4mClient.agent.lock('secret')
            expect(agentStatus.did).toBe("did:ad4m:test")
            expect(agentStatus.isUnlocked).toBe(false)
        })

        it('unlock() works', async () => {
            const agentStatus = await ad4mClient.agent.unlock('secret')
            expect(agentStatus.did).toBe("did:ad4m:test")
            expect(agentStatus.isUnlocked).toBe(true)
        })

        it('byDID() works', async () => {
            const agent = await ad4mClient.agent.byDID('did:method:12345')
            expect(agent.did).toBe('did:method:12345')
        })

        it('updatePublicPerspective() works', async () => {
            const perspective = new Perspective()
            const link = new LinkExpression()
            link.author = 'did:method:12345'
            link.timestamp = new Date().toString()
            link.data = new Link({source: 'root', target: 'perspective://Qm34589a3ccc0'})
            link.proof = { signature: 'asdfasdf', key: 'asdfasdf' }
            perspective.links.push(link)

            const agent = await ad4mClient.agent.updatePublicPerspective(perspective)
            expect(agent.did).toBe('did:ad4m:test')
            expect(agent.perspective.links.length).toBe(1)
            expect(agent.perspective.links[0].data.source).toBe('root')
            expect(agent.perspective.links[0].data.target).toBe('perspective://Qm34589a3ccc0')
        })

        it('updateInboxLanguage() works', async () => {
            const agent = await ad4mClient.agent.updateInboxLanguage("abcd")
            expect(agent.directMessageLanguage.address).toBe('abcd')
        })
    })

    describe('.langauge', () => {
        it('byAddress() works', async () => {
            const language = await ad4mClient.languages.byAddress('test-language-address')
            expect(language.address).toBe('test-language-address')
        })

        it('byFilter() works', async () => {
            const languages = await ad4mClient.languages.byFilter('linksAdapter')
            expect(languages.length).toBe(1)
            expect(languages[0].name).toBe('test-links-language')
        })

        it('writeSettings() works', async () => {
            const result = await ad4mClient.languages.writeSettings(
                'test-language-address',
                JSON.stringify({testSetting: true})
            )
            expect(result).toBe(true)
        })

        it('cloneHolochainTemplate() works', async () => {
            const language = await ad4mClient.languages.cloneHolochainTemplate(
                './languages/agent-language.js',
                'agents',
                '57398-234234-54453345-34'
            )
            expect(language.name).toBe('agents-clone')
        })
    })



})