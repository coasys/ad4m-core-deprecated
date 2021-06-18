export declare class Link {
    source: string;
    target: string;
    predicate?: string;
}
declare const LinkExpression_base: any;
export declare class LinkExpression extends LinkExpression_base {
}
export declare class LinkQuery {
    source?: string;
    target?: string;
    predicate?: string;
    fromDate?: Date;
    untilDate?: Date;
}
export {};
