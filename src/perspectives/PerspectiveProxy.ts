import PerspectiveClient, { LinkCallback, PerspectiveHandleCallback } from "./PerspectiveClient";
import { Link, LinkExpression } from "../links/Links";
import { LinkQuery } from "./LinkQuery";
import { Neighbourhood } from "../neighbourhood/Neighbourhood";
import { PerspectiveHandle } from './PerspectiveHandle'
import { Perspective } from "./Perspective";

type PerspectiveListenerTypes = "link-added" | "link-removed"

export class PerspectiveProxy {
    #handle: PerspectiveHandle
    #client: PerspectiveClient
    #perspectiveLinkAddedCallbacks: LinkCallback[]
    #perspectiveLinkRemovedCallbacks: LinkCallback[]
    #executeAction

    constructor(handle: PerspectiveHandle, ad4m: PerspectiveClient) {
        this.#perspectiveLinkAddedCallbacks = []
        this.#perspectiveLinkRemovedCallbacks = []
        this.#handle = handle
        this.#client = ad4m
        this.#client.addPerspectiveLinkAddedListener(this.#handle.uuid, this.#perspectiveLinkAddedCallbacks)
        this.#client.addPerspectiveLinkRemovedListener(this.#handle.uuid, this.#perspectiveLinkRemovedCallbacks)

        this.#executeAction = async (actions, expression) => {
            console.log("execute:", actions)
    
            const replaceThis = (input: string|undefined) => {
                if(input)
                    return input.replace('this', expression)
                else
                    return undefined
            }
    
            for(let command of actions) {
                switch(command.action) {
                    case 'addLink':
                        await this.add(new Link({
                            source: replaceThis(command.source),
                            predicate: replaceThis(command.predicate),
                            target: replaceThis(command.target)
                        }))
                        break;
                    case 'removeLink':
                        const linkExpressions = await this.get(new LinkQuery({
                            source: replaceThis(command.source), 
                            predicate: replaceThis(command.predicate), 
                            target: replaceThis(command.target)}))
                        for (const linkExpression of linkExpressions) {
                            await this.remove(linkExpression)
                        }
                        break;
                }
            }
        }
    }

    get uuid(): string {
        return this.#handle.uuid
    }

    get name(): string {
        return this.#handle.name
    }

    get sharedUrl(): string|void {
        return this.#handle.sharedUrl
    }

    get neighbourhood(): Neighbourhood|void {
        return this.#handle.neighbourhood
    }

    async get(query: LinkQuery): Promise<LinkExpression[]> {
        return await this.#client.queryLinks(this.#handle.uuid, query)
    }

    async infer(query: string): Promise<any> {
        return await this.#client.queryProlog(this.#handle.uuid, query)
    }

    async add(link: Link): Promise<LinkExpression> {
        return await this.#client.addLink(this.#handle.uuid, link)
    }

    async update(oldLink: LinkExpression, newLink: Link) {
        return await this.#client.updateLink(this.#handle.uuid, oldLink, newLink)
    }

    async remove(link: LinkExpression) {
        return await this.#client.removeLink(this.#handle.uuid, link)
    }

    async addListener(type: PerspectiveListenerTypes, cb: LinkCallback) {
        if (type === 'link-added') {
            this.#perspectiveLinkAddedCallbacks.push(cb);
        } else if (type === 'link-removed') {
            this.#perspectiveLinkRemovedCallbacks.push(cb);
        }
    }

    async removeListener(type: PerspectiveListenerTypes, cb: LinkCallback) {
        if (type === 'link-added') {
            const index = this.#perspectiveLinkAddedCallbacks.indexOf(cb);
    
            this.#perspectiveLinkAddedCallbacks.splice(index, 1);
        } else if (type === 'link-removed') {
            const index = this.#perspectiveLinkRemovedCallbacks.indexOf(cb);

            this.#perspectiveLinkRemovedCallbacks.splice(index, 1);
        }
    }

    async snapshot() {
        return this.#client.snapshotByUUID(this.#handle.uuid)
    }

    async loadSnapshot(snapshot: Perspective) {
        for(const link of snapshot.links) {
            await this.add(link.data)
        }
    }

    async getSingleTarget(query: LinkQuery): Promise<string|void> {
        delete query.target
        const foundLinks = await this.get(query)
        if(foundLinks.length)
            return foundLinks[0].data.target
        else
            return null
    }

    async setSingleTarget(link: Link) {
        const query = new LinkQuery({source: link.source, predicate: link.predicate})
        const foundLinks = await this.get(query)
        for(const l of foundLinks)
            await this.remove(l)
        await this.add(link)
    }

    // Returns all the SDNA flows defined in this perspective
    async sdnaFlows(): Promise<string[]> {
        const allFlows = await this.infer("register_sdna_flow(X, _)")
        return allFlows.map(x => x.X)
    }

    // Returns all SDNA flows that can be started from the given expression
    async availableFlows(exprAddr: string): Promise<string[]> {
        const availableFlows = await this.infer(`flowable("${exprAddr}", F), register_sdna_flow(X, F)`)
        return availableFlows.map(x => x.X)
    }

    // Starts a new flow
    async startFlow(flowName: string, exprAddr: string) {
        let startAction = await this.infer(`start_action(Action, F), register_sdna_flow("${flowName}", F)`)
        // should always return one solution...
        startAction = eval(startAction[0].Action)
        await this.#executeAction(startAction, exprAddr)
    }

    // Returns all expressions in the given state of given flow
    async expressionsInFlowState(flowName: string, flowState: number): Promise<string[]> {
        let expressions = await this.infer(`register_sdna_flow("${flowName}", F), flow_state(X, ${flowState}, F)`)
        return expressions.map(r => r.X)
    }

    // Returns the given expression's flow state with regard to given flow
    async flowState(flowName: string, exprAddr: string): Promise<number> {
        let state = await this.infer(`register_sdna_flow("${flowName}", F), flow_state("${exprAddr}", X, F)`)
        return state[0].X
    }

    // Returns available action names, with regard to flow and expression's flow state
    async flowActions(flowName: string, exprAddr: string): Promise<string[]> {
        let actionNames = await this.infer(`register_sdna_flow("${flowName}", Flow), flow_state("${exprAddr}", State, Flow), action(State, Name, _, _)`)
        return actionNames.map(r => r.Name)
    }

    // Runs given action
    async runFlowAction(flowName: string, exprAddr: string, actionName: string) {
        let action = await this.infer(`register_sdna_flow("${flowName}", Flow), flow_state("${exprAddr}", State, Flow), action(State, "${actionName}", _, Action)`)
        // should find only one
        action = eval(action[0].Action)
        await this.#executeAction(action, exprAddr)
    }

}