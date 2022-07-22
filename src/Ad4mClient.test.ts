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
import { EntanglementProofInput } from "./agent/Agent";
import { LanguageMetaInput } from "./language/LanguageMeta";
import { InteractionCall } from "./language/Language";

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
            // @ts-ignore
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

        ad4mClient = new Ad4mClient(apolloClient, true)
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

        it('entanglementProof() smoke tests', async () => {
            const addProof = await ad4mClient.agent.addEntanglementProofs([new EntanglementProofInput("did:key:hash", "did-key-id", "ethereum", "ethAddr", "sig", "sig2")]);
            expect(addProof[0].did).toBe("did:key:hash")
            expect(addProof[0].didSigningKeyId).toBe("did-key-id")
            expect(addProof[0].deviceKeyType).toBe("ethereum")
            expect(addProof[0].deviceKey).toBe("ethAddr")
            expect(addProof[0].deviceKeySignedByDid).toBe("sig")
            expect(addProof[0].didSignedByDeviceKey).toBe("sig2")

            const getProofs = await ad4mClient.agent.getEntanglementProofs();
            expect(getProofs[0].did).toBe("did:key:hash")
            expect(getProofs[0].didSigningKeyId).toBe("did-key-id")
            expect(getProofs[0].deviceKeyType).toBe("ethereum")
            expect(getProofs[0].deviceKey).toBe("ethAddr")
            expect(getProofs[0].deviceKeySignedByDid).toBe("sig")
            expect(getProofs[0].didSignedByDeviceKey).toBe("sig2")

            const deleteProofs = await ad4mClient.agent.deleteEntanglementProofs([new EntanglementProofInput("did:key:hash", "did-key-id", "ethereum", "ethAddr", "sig", "sig2")]);
            expect(deleteProofs[0].did).toBe("did:key:hash")
            expect(deleteProofs[0].didSigningKeyId).toBe("did-key-id")
            expect(deleteProofs[0].deviceKeyType).toBe("ethereum")
            expect(deleteProofs[0].deviceKey).toBe("ethAddr")
            expect(deleteProofs[0].deviceKeySignedByDid).toBe("sig")
            expect(deleteProofs[0].didSignedByDeviceKey).toBe("sig2")

            const preflight = await ad4mClient.agent.entanglementProofPreFlight("ethAddr", "ethereum");
            expect(preflight.did).toBe("did:key:hash")
            expect(preflight.didSigningKeyId).toBe("did-key-id")
            expect(preflight.deviceKeyType).toBe("ethereum")
            expect(preflight.deviceKey).toBe("ethAddr")
            expect(preflight.deviceKeySignedByDid).toBe("sig")
            expect(preflight.didSignedByDeviceKey).toBe(null)
        })

        it('requestCapability() smoke tests', async () => {
            const requestId = await ad4mClient.agent.requestCapability("demo-app", "demo-desc", "https://demo-link", '[{"with":{"domain":"agent","pointers":["*"]},"can":["QUERY"]}]')
            expect(requestId).toBe("test-request-id")
        })

        it('agentPermitCapability() smoke tests', async () => {
            const rand = await ad4mClient.agent.permitCapability('{"requestId":"4f30e2e2-d307-4f2b-b0a0-6dac4ca4af26","auth":{"appName":"demo-app","appDesc":"demo-desc","appUrl":"demo-url","capabilities":[{"with":{"domain":"agent","pointers":["*"]},"can":["QUERY"]}]}}')
            expect(rand).toBe("123")
        })

        it('agentGenerateJwt() smoke tests', async () => {
            const jwt = await ad4mClient.agent.generateJwt("test-request-id", "123")
            expect(jwt).toBe("test-jwt")
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

        it('getMany() smoke test', async () => {
            const getMany = await ad4mClient.expression.getMany(["hash1", "hash2"]);
            expect(getMany.length).toBe(2);
            expect(getMany[0].author).toBe('did:ad4m:test');
            expect(getMany[0].data).toBe("{\"type\":\"test expression\",\"content\":\"test\"}");
            expect(getMany[1]).toBeNull();
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

            const address2 = await ad4mClient.expression.create({content: 'json'}, 'Qmabcdf')
            expect(address2.toString()).toBe("Qm1234")
        })

        it('interactions() smoke test', async () => {
            const interactions = await ad4mClient.expression.interactions('Qmabcdf')
            expect(interactions.length).toBe(1)
            const i = interactions[0]
            expect(i.label).toBe("Add a comment")
            expect(i.name).toBe("add_comment")
            expect(i.parameters.length).toBe(1)
            const param = i.parameters[0]
            expect(param.name).toBe('comment')
            expect(param.type).toBe('string')
        })

        it('interact() smoke test', async () => {
            const call = new InteractionCall('add_comment', { content: 'test'})
            const result = await ad4mClient.expression.interact('Qmabcdf', call)
            expect(result.toString()).toBe("test result")
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

        it('all() smoke test', async () => {
            const languages = await ad4mClient.languages.all()
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

        it('applyTemplateAndPublish() smoke test', async () => {
            const language = await ad4mClient.languages.applyTemplateAndPublish(
                'languageHash',
                '{"name": "test-templating"}',
            )
            expect(language.name).toBe('languageHash-clone')
        })

        it('publish() smoke test', async () => {
            let input = new LanguageMetaInput()
            input.name = "test language 1"
            input.description = "Language for smoke testing"
            input.possibleTemplateParams = ['uuid', 'name', 'membrane']
            input.sourceCodeLink = "https://github.com/perspect3vism/test-language"

            const languageMeta = await ad4mClient.languages.publish(
                '/some/language/path/',
                input,
            )
            expect(languageMeta.name).toBe(input.name)
            expect(languageMeta.description).toBe(input.description)
            expect(languageMeta.possibleTemplateParams).toStrictEqual(input.possibleTemplateParams)
            expect(languageMeta.sourceCodeLink).toBe(input.sourceCodeLink)
            expect(languageMeta.address).toBe("Qm12345")
            expect(languageMeta.author).toBe("did:test:me")
            expect(languageMeta.templateSourceLanguageAddress).toBe("Qm12345")
            expect(languageMeta.templateAppliedParams).toBe(JSON.stringify({uuid: 'asdfsdaf', name: 'test template'}))
        })

        it('meta() smoke test', async () => {
            let input = new LanguageMetaInput()
            input.name = "test language 1"
            input.description = "Language for smoke testing"
            input.possibleTemplateParams = ['uuid', 'name', 'membrane']
            input.sourceCodeLink = "https://github.com/perspect3vism/test-language"

            const languageMeta = await ad4mClient.languages.meta("Qm12345")

            expect(languageMeta.name).toBe("test-language")
            expect(languageMeta.address).toBe("Qm12345")
            expect(languageMeta.description).toBe("Language meta for testing")
            expect(languageMeta.author).toBe("did:test:me")
            expect(languageMeta.templated).toBe(true)
            expect(languageMeta.templateSourceLanguageAddress).toBe("Qm12345")
            expect(languageMeta.templateAppliedParams).toBe(JSON.stringify({uuid: 'asdfsdaf', name: 'test template'}))
            expect(languageMeta.possibleTemplateParams).toStrictEqual(['uuid', 'name'])
            expect(languageMeta.sourceCodeLink).toBe("https://github.com/perspect3vism/ad4m")
        })

        it('source() smoke test', async () => {
            const source = await ad4mClient.languages.source("Qm12345")
            expect(source).toBe("var test = 'language source code'")
        })
    })

    describe('.neighbourhood', () => {
        it('publishFromPerspective() smoke test', async () => {
            const expressionRef = await ad4mClient.neighbourhood.publishFromPerspective('UUID', 'test-link-lang', new Perspective())
            expect(expressionRef).toBe('neighbourhood://neighbourhoodAddress')
        })

        it('joinFromUrl() smoke test', async () => {
            const perspective = await ad4mClient.neighbourhood.joinFromUrl('neighbourhood://Qm3sdf3dfwhsafd')
            expect(perspective.sharedUrl).toBe('neighbourhood://Qm3sdf3dfwhsafd')
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
            expect(p2.sharedUrl).toBe('neighbourhood://Qm12345')
            expect(p2.neighbourhood.linkLanguage).toBe("language://Qm12345")
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

        it('publishSnapshotByUUID() smoke test', async () => {
            const snapshotUrl = await ad4mClient.perspective.publishSnapshotByUUID('00004')
            expect(snapshotUrl).toBe('perspective://Qm12345')

        })

        it('queryLinks() smoke test', async () => {
            const links = await ad4mClient.perspective.queryLinks('000001', {source: 'root'})
            expect(links.length).toBe(1)
            expect(links[0].data.source).toBe('root')
            expect(links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('queryProlog() smoke test', async () => {
            let result = await ad4mClient.perspective.queryProlog('000001', "link(X, 2).")
            expect(result.length).toBe(1)
            expect(result[0].X).toBe(1)

            const proxy = await ad4mClient.perspective.byUUID('000001')
            result = await proxy.infer("link(X, 2).")
            expect(result.length).toBe(1)
            expect(result[0].X).toBe(1)
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

        it('subscribePerspectiveLinkAdded() smoke test', async () => {
            const linkAdded = jest.fn()

            // addPerspectiveLinkAddedListener
            let perspective = await ad4mClient.perspective.byUUID('00004')
            ad4mClient.perspective.subscribePerspectiveLinkAdded('00004')
            
            ad4mClient.perspective.addPerspectiveLinkAddedListener('00004', linkAdded)
            await perspective.add({source: 'root', target: 'neighbourhood://Qm123'})  

            expect(linkAdded).toBeCalledTimes(1)

            // addPerspectiveLinkAddedListener
            linkAdded.mockClear();

            let anotherPerspective = await ad4mClient.perspective.byUUID('00005')
            ad4mClient.perspective.subscribePerspectiveLinkAdded('00005')

            ad4mClient.perspective.addPerspectiveLinkAddedListener('00005', linkAdded)
            ad4mClient.perspective.removePerspectiveLinkAddedListener('00005', linkAdded)
            await perspective.add({source: 'root', target: 'neighbourhood://Qm456'})  

            expect(linkAdded).toBeCalledTimes(0)
        })

        it('subscribePerspectiveLinkRemoved() smoke test', async () => {
            const linkRemoved = jest.fn()

            // addPerspectiveLinkRemovedListener
            let perspective = await ad4mClient.perspective.byUUID('00004')
            ad4mClient.perspective.subscribePerspectiveLinkRemoved('00004')

            ad4mClient.perspective.addPerspectiveLinkRemovedListener('00004', linkRemoved)
            await perspective.remove({author: '', timestamp: '', proof: {signature: '', key: ''}, data:{source: 'root', target: 'neighbourhood://Qm123'}})

            expect(linkRemoved).toBeCalledTimes(1)

            // removePerspectiveLinkRemovedListener
            linkRemoved.mockClear();

            let anotherPerspective = await ad4mClient.perspective.byUUID('00005')
            ad4mClient.perspective.subscribePerspectiveLinkRemoved('00005')

            ad4mClient.perspective.addPerspectiveLinkRemovedListener('00005', linkRemoved)
            ad4mClient.perspective.removePerspectiveLinkRemovedListener('00005', linkRemoved)
            await anotherPerspective.remove({author: '', timestamp: '', proof: {signature: '', key: ''}, data:{source: 'root', target: 'neighbourhood://Qm456'}})

            expect(linkRemoved).toBeCalledTimes(0)
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
        
        it('addTrustedAgents() smoke test', async () => {
            const r = await ad4mClient.runtime.addTrustedAgents(["agentPubKey"]);
            expect(r).toStrictEqual([ 'agentPubKey' ])
        })

        it('deleteTrustedAgents() smoke test', async () => {
            const r = await ad4mClient.runtime.deleteTrustedAgents(["agentPubKey"]);
            expect(r).toStrictEqual([])
        })

        it('getTrustedAgents() smoke test', async () => {
            const r = await ad4mClient.runtime.getTrustedAgents();
            expect(r).toStrictEqual([ 'agentPubKey' ])
        })

        it('addKnownLinkLanguageTemplates() smoke test', async () => {
            const r = await ad4mClient.runtime.addKnownLinkLanguageTemplates(["Qm1337"]);
            expect(r).toStrictEqual([ 'Qm1337' ])
        })

        it('removeKnownLinkLanguageTemplates() smoke test', async () => {
            const r = await ad4mClient.runtime.removeKnownLinkLanguageTemplates(["Qm12345abcdef"]);
            expect(r).toStrictEqual([])
        })

        it('knownLinkLanguageTemplates() smoke test', async () => {
            const r = await ad4mClient.runtime.knownLinkLanguageTemplates();
            expect(r).toStrictEqual([ 'Qm12345abcdef' ])
        })

        it('addFriends() smoke test', async () => {
            const r = await ad4mClient.runtime.addFriends(["did:test:another_friend"]);
            expect(r).toStrictEqual([ 'did:test:another_friend' ])
        })

        it('removeFriends() smoke test', async () => {
            const r = await ad4mClient.runtime.removeFriends(["did:test:friend"]);
            expect(r).toStrictEqual([])
        })

        it('friends() smoke test', async () => {
            const r = await ad4mClient.runtime.friends();
            expect(r).toStrictEqual([ 'did:test:friend' ])
        })

        it('hcAgentInfos smoke test', async () => {
            const agentInfos = JSON.parse(await ad4mClient.runtime.hcAgentInfos())
            expect(agentInfos.length).toBe(4)
            expect(agentInfos[0].agent).toBeDefined()
            expect(agentInfos[0].signature).toBeDefined()
            expect(agentInfos[0].agent_info).toBeDefined()
        })

        it('hcAddAgentInfos smoke test', async () => {
            await ad4mClient.runtime.hcAddAgentInfos("agent infos string")
        })

        it('ververifyStringSignedByDid() smoke test', async () => {
            const verify = await ad4mClient.runtime.verifyStringSignedByDid("did", "didSigningKeyId", "data", "signedData")
            expect(verify).toBe(true)
        })
        
        it('setStatus smoke test', async () => {
            const link = new LinkExpression()
            link.author = 'did:method:12345'
            link.timestamp = new Date().toString()
            link.data = new Link({source: 'root', target: 'perspective://Qm34589a3ccc0'})
            link.proof = { signature: 'asdfasdf', key: 'asdfasdf' }
            await ad4mClient.runtime.setStatus(new Perspective([link]))
        })

        it('friendStatus smoke test', async () => {
            const statusExpr = await ad4mClient.runtime.friendStatus("did:ad4m:test")
            expect(statusExpr.author).toBe("did:ad4m:test")
            const statusPersp = statusExpr.data
            expect(statusPersp.links.length).toBe(1)
            expect(statusPersp.links[0].data.source).toBe('root')
            expect(statusPersp.links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('friendSendMessage smoke test', async () => {
            const link = new LinkExpression()
            link.author = 'did:method:12345'
            link.timestamp = new Date().toString()
            link.data = new Link({source: 'root', target: 'perspective://Qm34589a3ccc0'})
            link.proof = { signature: 'asdfasdf', key: 'asdfasdf' }
            await ad4mClient.runtime.friendSendMessage('did:ad4m:test', new Perspective([link]))
        })

        it('messageInbox smoke test', async () => {
            const messages = await ad4mClient.runtime.messageInbox()
            expect(messages.length).toBe(1)
            const message = messages[0]
            expect(message.author).toBe("did:ad4m:test")
            const messagePersp = message.data
            expect(messagePersp.links.length).toBe(1)
            expect(messagePersp.links[0].data.source).toBe('root')
            expect(messagePersp.links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('messageOutbox smoke test', async () => {
            const sentMessages = await ad4mClient.runtime.messageOutbox("did:ad4m:test")
            expect(sentMessages.length).toBe(1)
            const sentMessage = sentMessages[0]
            expect(sentMessage.recipient).toBe("did:test:recipient")
            const message = sentMessage.message
            expect(message.author).toBe("did:ad4m:test")
            const messagePersp = message.data
            expect(messagePersp.links.length).toBe(1)
            expect(messagePersp.links[0].data.source).toBe('root')
            expect(messagePersp.links[0].data.target).toBe('neighbourhood://Qm12345')
        })

        it('runtimeInfo smoke test', async () => {
            const runtimeInfo = await ad4mClient.runtime.info();
            expect(runtimeInfo.ad4mExecutorVersion).toBe("x.x.x")
        })
    })
})