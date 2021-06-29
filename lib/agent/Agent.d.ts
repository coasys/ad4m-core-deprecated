import { Perspective } from "../perspectives/PerspectiveGraphQL";
export default class Agent {
    did: String;
    perspective: Perspective;
    constructor(did: string, perspective: Perspective);
}
