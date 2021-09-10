
import { Ad4mClient, Link, LinkQuery, Perspective } from '@perspect3vism/ad4m'
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { WebSocketLink } from '@apollo/client/link/ws'
import ws from "ws"
import path from "path"


const uri = 'http://localhost:4000/graphql'
const apolloClient = new ApolloClient({
    link: new WebSocketLink({
        uri,
        options: { reconnect: true },
        webSocketImpl: ws,
    }),
    cache: new InMemoryCache({resultCaching: false, addTypename: false}),
    defaultOptions: {
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" }
    },
});


let ad4mClient = new Ad4mClient(apolloClient)
// To make readme code lines executable / testable:
async function ad4mTutorial() {

let { isInitialized, isUnlocked, did } = await ad4mClient.agent.status()

if(!isInitialized) {
    did = (await ad4mClient.agent.generate("passphrase")).did
} else {
    if(!isUnlocked) {
        await ad4mClient.agent.unlock("passphrase")
    }
}

const languages = await ad4mClient.languages.all()
const noteIpfsAddress = languages.find(l => l.name === 'note-ipfs').address

const exprAddress = await ad4mClient.expression.create("A new text note", noteIpfsAddress)

let perspectiveHandle = await ad4mClient.perspective.add("A new perspective on apps...")
await ad4mClient.perspective.addLink(
    perspectiveHandle.uuid,
    new Link({
        source: 'root',
        target: exprAddress
    })
)

const uniqueLinkLanguage = await ad4mClient.languages.cloneHolochainTemplate(path.join(__dirname, "../languages/social-context"), "social-context", "b98e53a8-5800-47b6-adb9-86d55a74871e");

const meta = new Perspective()
const neighbourhoodUrl = await ad4mClient.neighbourhood.publishFromPerspective(
    perspectiveHandle.uuid,
    uniqueLinkLanguage.address,
    meta
)
console.log(neighbourhoodUrl) // => neighbourhood://Qm123456789abcdef

perspectiveHandle = await ad4mClient.neighbourhood.joinFromUrl(neighbourhoodUrl)
const links = await ad4mClient.perspective.queryLinks(perspectiveHandle.uuid, new LinkQuery({source: 'a'}))
links.forEach(async link => {
    const address = link.data.target
    const expression = await ad4mClient.expression.get(address)
    const data = JSON.parse(expression.data)
    console.log(data) //=> "A new text note"
})

// Closing and executing ad4mTutorial() to test readme code
}; ad4mTutorial();
