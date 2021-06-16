import type Address from '../address/Address';
import type Agent from '../agent/Agent';
import type Expression from '../expression/Expression';
import type { LinkQuery } from '../Links';
export default interface Language {
    readonly name: string;
    readonly expressionAdapter?: ExpressionAdapter;
    readonly agentAdapter?: AgentAdapter;
    readonly languageAdapter?: LanguageAdapter;
    readonly getByAuthorAdapter?: GetByAuthorAdapter;
    readonly getAllAdapter?: GetAllAdapter;
    readonly directMessageAdapter?: DirectMessageAdapter;
    readonly linksAdapter?: LinksAdapter;
    readonly expressionUI?: ExpressionUI;
    readonly settingsUI?: SettingsUI;
    interactions(a: Agent, expression: Address): Interaction[];
}
export interface ExpressionUI {
    icon(): string;
    constructorIcon(): string;
}
export interface SettingsUI {
    settingsIcon(): string;
}
export interface ExpressionAdapter {
    get(address: Address): Promise<void | Expression>;
    putAdapter: PublicSharing | ReadOnlyLanguage;
}
export interface PublicSharing {
    createPublic(content: object): Promise<Address>;
}
export interface ReadOnlyLanguage {
    addressOf(content: object): Promise<Address>;
}
export interface AgentAdapter {
    setProfile(agent: Agent): any;
    getProfile(did: string): Promise<Agent | void>;
}
export interface LanguageAdapter {
    getLanguageSource(address: Address): Promise<string>;
}
export interface GetByAuthorAdapter {
    getByAuthor(author: Agent, count: number, page: number): Promise<void | Expression[]>;
}
export interface GetAllAdapter {
    getAll(filter: any, count: number, page: number): Promise<void | Expression[]>;
}
export declare type NewLinksObserver = (added: Expression[], removed: Expression[]) => void;
export interface LinksAdapter {
    writable(): boolean;
    public(): boolean;
    others(): Promise<Agent[]>;
    addLink(linkExpression: Expression): any;
    updateLink(oldLinkExpression: Expression, newLinkExpression: Expression): any;
    removeLink(link: Expression): any;
    getLinks(query: LinkQuery): Promise<Expression[]>;
    addCallback(callback: NewLinksObserver): any;
}
export interface DirectMessageAdapter {
    sendPrivate(to: Agent, content: object): any;
    inbox(filterFrom: void | Agent[]): Promise<Expression[]>;
}
export interface Interaction {
    readonly label: string;
    readonly name: string;
    readonly parameters: [string, string][];
    execute(parameters: object): any;
}
export declare class InteractionCall {
    name: string;
    parameters: object;
}
export declare class OnlineAgent {
    did: string;
    status: string;
}
export declare class TelepresenceRpcCall {
    fn_name: string;
    params: object;
}
export declare type TelepresenceRpcCallback = (call: TelepresenceRpcCall) => object;
export interface TelepresenceAdapter {
    setOnlineStatus(status: string): any;
    getOnlineAgents(): [OnlineAgent];
    rpcCall(remoteAgentDid: string, call: TelepresenceRpcCall): object;
    registerRpcCallback(callback: TelepresenceRpcCall): any;
}
