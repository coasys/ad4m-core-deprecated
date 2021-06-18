import type Expression from '../expression/Expression';

export default class Link {
    source: string;
    target: string;
    predicate?: string;

    constructor(obj) {
        this.source = obj.source ? obj.source : ''
        this.target = obj.target ? obj.target : ''
        this.predicate = obj.predicate ? obj.predicate : ''
    }
}

export class LinkQuery {
    source?: string;
    target?: string;
    predicate?: string;
    fromDate?: Date;
    untilDate?: Date;

    constructor(obj: object) {
        if(obj) {
            // @ts-ignore
            this.source = obj.source
            // @ts-ignore
            this.predicate = obj.predicate
            // @ts-ignore
            this.target = obj.target
            // @ts-ignore
            if(obj.fromDate) {
                // @ts-ignore
                this.fromDate = obj.fromDate;
            };
            // @ts-ignore
            if (obj.untilDate) {
                // @ts-ignore
                this.untilDate = obj.untilDate;
            }
        }
    }

    isMatch(l: Link): boolean {
        if(this.source)
            if(this.source !== l.source)
                return false

        if(this.predicate)
            if(this.predicate !== l.predicate)
                return false
        
        if(this.target)
            if(this.target !== l.target)
                return false    

        return true
    }
}

export function linkEqual(l1: Expression, l2: Expression): boolean {
    return l1.author == l2.author &&
        l1.timestamp == l2.timestamp &&
        // @ts-ignore
        l1.data.source == l2.data.source &&
        // @ts-ignore
        l1.data.predicate == l2.data.predicate &&
        // @ts-ignore
        l1.data.target == l2.data.target
}

export function isLink(l: any): boolean {
    return l && l.source && l.target
}

export function hashLinkExpression(link: Expression): number {
    const mash = JSON.stringify(link.data, Object.keys(link.data).sort()) +
                JSON.stringify(link.author) + link.timestamp
    let hash = 0, i, chr;
    for (i = 0; i < mash.length; i++) {
        chr   = mash.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}