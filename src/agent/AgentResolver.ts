import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import Perspective from "../perspectives/Perspective";
import Agent from "./Agent";

@Resolver()
export default class AgentResolver {
    @Query()
    getThisAgent(): Agent {
        return new Agent("", new Perspective)
    }

    @Query()
    getAgentByDID(did: string): Agent {
        return new Agent("", new Perspective)
    }

    //@Mutation()
    //updateAgentPerspective(@Arg('perspective') perspective: Perspective) {

//    }
}