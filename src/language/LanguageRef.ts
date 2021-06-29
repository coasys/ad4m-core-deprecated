import type Address from '../address/Address'
import { Field, ObjectType } from "type-graphql";


// Unique Language ID with option type
@ObjectType()
export default class LanguageRef {
    @Field()
    address: Address;
    
    @Field()
    name: string;
}
