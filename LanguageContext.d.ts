/// <reference types="node" />
import type AgentService from "./AgentService";
import type SignaturesService from "./SignaturesService";
import type { AppSignalCb } from '@holochain/conductor-api';
export default interface LanguageContext {
    agent: AgentService;
    IPFS: IPFSNode;
    signatures: SignaturesService;
    storageDirectory: string;
    customSettings: object;
    Holochain: HolochainLanguageDelegate | void;
    ad4mSignal: Ad4mSignalCB;
}
export declare class Dna {
    file: Buffer;
    nick: string;
}
export interface HolochainLanguageDelegate {
    registerDNAs(dnas: Dna[], holochainSignalCallback?: AppSignalCb): any;
    call(dnaNick: string, zomeName: string, fnName: string, params: object | string): Promise<any>;
}
export declare type Ad4mSignalCB = (signal: any) => void;
export interface IPFSNode {
    add(data: object): Promise<object>;
    cat(data: object): Promise<object>;
}
