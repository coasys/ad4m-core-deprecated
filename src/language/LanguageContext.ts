import type { AppSignalCb } from '@holochain/conductor-api'
import { Expression } from "../expression/Expression";

export interface AgentService {
    readonly did: string
    createSignedExpression(data: any): Expression
}

export interface SignaturesService {
    verify(expr: Expression): boolean
}

export interface LanguageContext {
    agent: AgentService;
    IPFS: IPFSNode;
    signatures: SignaturesService;
    storageDirectory: string;
    customSettings: object;
    Holochain: HolochainLanguageDelegate | undefined;
    ad4mSignal: Ad4mSignalCB;
}

export class Dna {
    file: Buffer
    nick: string
}

export interface HolochainLanguageDelegate {
    registerDNAs(dnas: Dna[], holochainSignalCallback?: AppSignalCb);
    call(dnaNick: string, zomeName: string, fnName: string, params: object|string): Promise<any>;
}

export type Ad4mSignalCB = (signal: any) => void

export interface IPFSNode {
    add(data: object): Promise<object>
    cat(data: object): Promise<object>
}