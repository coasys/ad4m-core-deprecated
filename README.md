# AD4M
*The **A**gent-Centric **D**istributed **A**pplication **M**eta-ontology* 
or just: 
***A**gent-Centric **DA**pp **M**eta-ontology* 
* A new **meta-ontology** for interoperable, decentralized application design
* A **spanning-layer** to enable seamless integration between Holochain DNAs, blockchains, linked-data structures/ontologies and centralized back-ends
* The basis for turning distinct, monolithic and siloed apps into a global, open and interoperable **sense-making network**
---

## Ok, let's go...
To build an app/UI against Ad4m, you need to make sure that an 
[ad4m-executor](https://github.com/perspect3vism/ad4m-executor) is running
on the user's machine.

Then use `Ad4mClient` to connect to and work with the running ad4m-executor like this:
```
npm install --save @perspect3vism/ad4m
```
In your code:
```js
import { Ad4mClient } from '@perspect3vism/ad4m'
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import ws from "ws"

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


ad4mClient = new Ad4mClient(apolloClient)
```

### Unlocking / initializing the agent
You can't do much with the Ad4m runtime as long as the agent is not initialized.
So first get the agent status to see if we either need to create new DID or unlock
an existing keystore.

```js
const { isInitialized, isUnlocked, did } = await ad4mClient.agent.status()
```

If `isInitialized` is `false` (and then `did` is empty) we need to create or import
a DID and keys. `generate()` will create a new DID with method `key` and lock the
keystore with the given passphrase.

```js
const { did } = await ad4mClient.agent.generate("passphrase")
```

In following runs of the exectuor, `ad4mClient.agent.status()` will return a `did`
and `isInitialized` true, but if `isUnlocked` is false, we need to unlock the keystore
providing the passphrase:
```js
const { isUnlocked, did } = await ad4mClient.agent.unlock("passphrase")
```

### Languages
For creating an expression we need to select a language that we create an expression in:
```js
const languages = await ad4mClient.languages.all()
const noteIpfsAddress = languages.find(l => l.name === 'note-ipfs').address
```
### Creating an Expressions

```js
const exprAddress = await ad4mClient.expression.create("A new text note", noteIpfsAddress)
```

### Creating a Perspective and linking that new Expression
```js
const perspectiveHandle = await ad4mClient.perspective.add("A new perspective on apps...")
await ad4mClient.perspective.addLink(
    perspectiveHandle.uuid,
    new Link({
        source: 'root',
        target: exprAddress
    })
)
```

### Publishing that local Perspective by turning it into a Neighbourhood
The back-bone of a Neighbourhood is a *LinkLanguage* - a Language that enables the sharing
and thus synchronizing of links (see `LinksAdapter` in [Language.ts](src/language/Language.ts)). While there can and should be many different implementations
with different trade-offs and features (like membranes etc.) the go-to implementation for now
is *Social Context* from Junto: https://github.com/juntofoundation/Social-Context

Let's assume we have downloaded the build files from their release directory, we can use it as
a template to create a unique Language (with unique Holochain DNA in this case) like so:
```js
const uniqueLinkLanguage = await ad4mClient.languages.cloneHolochainTemplate(path.join(__dirname, "../languages/social-context"), "social-context", "b98e53a8-5800-47b6-adb9-86d55a74871e");
```
And then use this new LinkLanguage in our Neighbourhood:
```js
const meta = new Perspective()
const neighbourhoodUrl = await ad4mClient.neighbourhood.publishFromPerspective(
    perspectiveHandle.uuid,
    uniqueLinkLanguage.address,
    meta
)
console.log(neighbourhoodUrl) // => neighbourhood://Qm123456789abcdef
```

### Joining a Neighbourhood (on another node/agent)
Assume everything above happened on Alice's agent.
Alice now shares the Neighbourhood's URL with Bob.
This is what Bob does to join the Neigbourhood, access it as a (local) Perspective
and retrieve the Expression Alice created and linked there:
```js
const perspectiveHandle = await ad4mClient.neighbourhood.joinFromUrl(neighbourhoodUrl)
const links = await ad4mClient.perspective.queryLinks(perspectiveHandle.uuid, {})
links.forEach(link => {
    const address = link.data.target
    const expression = await ad4mClient.expression.get(address)
    const data = JSON.parse(expression.data)
    console.log(data) //=> "A new text note"
})
```

## Building from source
Run:
```
npm i && npm run build
```


---

## Wait, what?! 
The central claim of AD4M is that any single- but also specifically multi-user application can be bootstrapped out of a meta-ontology consisting of 3 quintessential entities:
* Agents
* Languages
* and Perspectives

This is a *meta*-ontology since it doesn't make any assumptions about the specific ontologies implemented in those bootstrapped apps. But since apps bootstrapped from it share the same meta-ontology, they are mutualy interoperable.

![](https://i.imgur.com/MXa0ozg.png)


### Agents...
...represent humans with their devices, which is what the internet actually is. Technically **represented as Decentralized Identifier - DID**.


### Languages...
...encapsulate the actual technology used to communicate, like Holochain or IPFS, but what they provide to the high-level layers is this: **Languages define Expressions**, which are the atoms of what Agents communicate. Expressions are always created, and thus signed, by an agent. Expressions are referenced via a URL of the kind `<language>://<language specific expression address>`. That URL and the Expression itself is the only objective part in AD4M. 


### Perspectives...
...belong to a specific agent. They represent context and association between expressions. They consist of a list of RDF/semantic web like triplets (subject-predicate-obejct) called `links` because all three items are just URLs pointing to expressions. Perspectives are like Solid's pods, but they are agent-centric. There is no such thing as a Perspective that does not belong to an agent. It is like the canvas on which an agent perceives and onto which they create anything. To the next layer above (either the very general UI built in Perspectivism - or any other special purpose UI), they are like a database scope.

---
### Bootstrapping

Any AD4M implementation will have to include at least 3 reflexive system Languages to enable the dynamic bootstrapping of apps and interconnected sense-making networks:
* A Language of Agents, i.e. where the expressions represent agents, and which uses DIDs as the expression URLs.
* A Language of Languages, i.e. a way to talk about Languages so Languages can be created by users and shared.
* A Language of Perspectives which implies the concept of **Shared Perspectives** a.k.a. **Neighbourhoods**, i.e. a way to share an otherwise local and private Perspective with others which constitutes the basic building block of any collaboration context.

Having these Languages means Agents can author expressions that represent Agents, Languages and Perspectives. These expressions get linked from inside Perspectives. That way we can model primitives like friends-lists (Perspective including agent expressions), app-stores (Perspective including Languages) and more.


### How do I build an app on/with AD4M?

Building an AD4M app actually means extending the AD4M ecosystem with the
* Languages
* and link-ontologies

needed for the apps domain - and then creating expressions from those Languages and linking them inside Perspectives.

The latter means creating RDF/semantic web style triplets that associate expressions in order to represent app specific semantics - not too different to how Solid style linked-data would work.
