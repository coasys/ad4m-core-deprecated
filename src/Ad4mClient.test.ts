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
import NeighbourhoodResolver from "./neighbourhood/NeighbourhoodResolver";
import PerspectiveResolver from "./perspectives/PerspectiveResolver";
import RuntimeResolver from "./runtime/RuntimeResolver";
import ExpressionResolver from "./expression/ExpressionResolver";

jest.setTimeout(15000)

describe('Ad4mClient', () => {
    let ad4mClient
    
    beforeAll(async () => {
        const schema = await buildSchema({
            resolvers: [
                AgentResolver, 
                ExpressionResolver,
                LanguageResolver, 
                NeighbourhoodResolver,
                PerspectiveResolver,
                RuntimeResolver
            ]
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
        it('me() smoke test', async () => {
            const agent = await ad4mClient.agent.me()
            expect(agent.did).toBe('did:ad4m:test')
        })

        it('status() smoke test', async () => {
            const agentStatus = await ad4mClient.agent.status()
            expect(agentStatus.did).toBe('did:ad4m:test')
            expect(agentStatus.isUnlocked).toBe(false)
        })

        it('import() smoke test', async () => {
            const did = "did:test:test"
            const didDocument = "did document test"
            const keystore = "test"
            const passphrase = "secret"

            const agentStatus = await ad4mClient.agent.import({
                did, didDocument, keystore, passphrase
            })

            expect(agentStatus.did).toBe(did)
            expect(agentStatus.didDocument).toBe(didDocument)
            expect(agentStatus.isInitialized).toBe(true)
            expect(agentStatus.isUnlocked).toBe(true)
        })

        it('generate() smoke test', async () => {
            const agentStatus = await ad4mClient.agent.generate("passphrase")
            expect(agentStatus.did).toBeDefined()
            expect(agentStatus.isInitialized).toBeTruthy()
        })

        it('lock() smoke test', async () => {
            const agentStatus = await ad4mClient.agent.lock('secret')
            expect(agentStatus.did).toBe("did:ad4m:test")
            expect(agentStatus.isUnlocked).toBe(false)
        })

        it('unlock() smoke test', async () => {
            const agentStatus = await ad4mClient.agent.unlock('secret')
            expect(agentStatus.did).toBe("did:ad4m:test")
            expect(agentStatus.isUnlocked).toBe(true)
        })

        it('byDID() smoke test', async () => {
            const agent = await ad4mClient.agent.byDID('did:method:12345')
            expect(agent.did).toBe('did:method:12345')
        })

        it('updatePublicPerspective() smoke test', async () => {
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

        it('updateDirectMessageLanguage() smoke test', async () => {
            const agent = await ad4mClient.agent.updateDirectMessageLanguage("abcd")
            expect(agent.directMessageLanguage).toBe('abcd')
        })
    })

    describe('.expression', () => {
        it('get() smoke test', async () => {
            const nonExisting = await ad4mClient.expression.get("wrong address")
            expect(nonExisting).toBeNull()

            const expression = await ad4mClient.expression.get("neighbourhood://Qm123")
            expect(expression).toBeDefined()
            expect(expression.author).toBe('did:ad4m:test')
            expect(expression.data).toBe("{\"type\":\"test expression\",\"content\":\"test\"}")
        })

        it('getRaw() smoke test', async () => {
            const nonExisting = await ad4mClient.expression.getRaw("wrong address")
            expect(nonExisting).toBeNull()

            const expressionRaw = await ad4mClient.expression.getRaw("neighbourhood://Qm123")
            expect(expressionRaw).toBeDefined()
            const expression = JSON.parse(expressionRaw)
            expect(expression.author).toBe('did:ad4m:test')
            expect(expression.data).toBe("{\"type\":\"test expression\",\"content\":\"test\"}")
        })

        it('create() smoke test', async () => {
            const address = await ad4mClient.expression.create('content', 'Qmabcdf')
            expect(address.toString()).toBe("Qm1234")
        })
    })

    describe('.langauges', () => {
        it('byAddress() smoke test', async () => {
            const language = await ad4mClient.languages.byAddress('test-language-address')
            expect(language.address).toBe('test-language-address')
        })

        it('byFilter() smoke test', async () => {
            const languages = await ad4mClient.languages.byFilter('linksAdapter')
            expect(languages.length).toBe(1)
            expect(languages[0].name).toBe('test-links-language')
        })

        it('writeSettings() smoke test', async () => {
            const result = await ad4mClient.languages.writeSettings(
                'test-language-address',
                JSON.stringify({testSetting: true})
            )
            expect(result).toBe(true)
        })

        it('cloneHolochainTemplate() smoke test', async () => {
            const language = await ad4mClient.languages.cloneHolochainTemplate(
                './languages/agent-language.js',
                'agents',
                '57398-234234-54453345-34'
            )
            expect(language.name).toBe('agents-clone')
        })
    })

    describe('.neighbourhood', () => {
        it('publishFromPerspective() smoke test', async () => {
            const expressionRef = await ad4mClient.neighbourhood.publishFromPerspective('UUID', 'test-link-lang', new Perspective())
            expect(expressionRef.expression).toBe('test-address')
            expect(expressionRef.language.name).toBe('neighbourhoods')
        })

        it('joinFromUrl() smoke test', async () => {
            const perspective = await ad4mClient.neighbourhood.joinFromUrl('neighbourhood://Qm3sdf3dfwhsafd')
            expect(perspective.sharedURL).toBe('neighbourhood://Qm3sdf3dfwhsafd')
            expect(perspective.uuid).toBeTruthy()
            expect(perspective.name).toBeTruthy()
        })
    })

    describe('.perspective', () => {
        it('all() smoke test',async () => {
            const perspectives = await ad4mClient.perspective.all()
            expect(perspectives.length).toBe(2)
            const p1 = perspectives[0]
            const p2 = perspectives[1]
            expect(p1.name).toBe('test-perspective-1')
            expect(p2.name).toBe('test-perspective-2')
            expect(p1.uuid).toBe('00001')
            expect(p2.uuid).toBe('00002')
            expect(p2.sharedURL).toBe('neighbourhood://Qm12345')
        })

        it('byUUID() smoke test', async () => {
            const p = await ad4mClient.perspective.byUUID('00004')
            expect(p.uuid).toBe('00004')
            expect(p.name).toBe('test-perspective-1')
        })

        it('snapshotByUUID() smoke test', async () => {
            const ps = await ad4mClient.perspective.snapshotByUUID('00004')
            expect(ps.links.length).toBe(1)
            expect(ps.links[0].author).toBe('did:ad4m:test')
            expect(ps.links[0].data.source).toBe('root')
            expect(ps.links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('queryLinks() smoke test', async () => {
            const links = await ad4mClient.perspective.queryLinks('000001', {source: 'root'})
            expect(links.length).toBe(1)
            expect(links[0].data.source).toBe('root')
            expect(links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('add() smoke test', async () => {
            const p = await ad4mClient.perspective.add('p-name')
            expect(p.uuid).toBe('00006')
            expect(p.name).toBe('p-name')
        })

        it('update() smoke test', async () => {
            const p = await ad4mClient.perspective.update('00001', 'new-name')
            expect(p.uuid).toBe('00001')
            expect(p.name).toBe('new-name')
        })

        it('remove() smoke test', async () => {
            const r = await ad4mClient.perspective.remove('000001')
            expect(r).toBeTruthy()
        })

        it('addLink() smoke test', async () => {
            const link = await ad4mClient.perspective.addLink('00001', {source: 'root', target: 'lang://Qm123', predicate: 'p'})
            expect(link.author).toBe('did:ad4m:test')
            expect(link.data.source).toBe('root')
            expect(link.data.predicate).toBe('p')
            expect(link.data.target).toBe('lang://Qm123')
        })

        it('updateLink() smoke test', async () => {
            const link = await ad4mClient.perspective.updateLink(
                '00001', 
                {author: '', timestamp: '', proof: {signature: '', key: ''}, data:{source: 'root', target: 'none'}},
                {source: 'root', target: 'lang://Qm123', predicate: 'p'})
            expect(link.author).toBe('did:ad4m:test')
            expect(link.data.source).toBe('root')
            expect(link.data.predicate).toBe('p')
            expect(link.data.target).toBe('lang://Qm123')
        })

        it('removeLink() smoke test', async () => {
            const r = await ad4mClient.perspective.removeLink('00001', {author: '', timestamp: '', proof: {signature: '', key: ''}, data:{source: 'root', target: 'none'}})
            expect(r).toBeTruthy()
        })
    })

    describe('.runtime', () => {
        it('quit() smoke test', async () => {
            const r = await ad4mClient.runtime.quit()
            expect(r).toBeTruthy()
        })

        it('openLink() smoke test', async () => {
            const r = await ad4mClient.runtime.openLink('https://ad4m.dev')
            expect(r).toBeTruthy()
        })
    })



})