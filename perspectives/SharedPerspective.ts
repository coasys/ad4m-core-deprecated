import type Address from "../address/Address"
import type LanguageRef from "../language/LanguageRef"

export enum SharingType  {
    Broadcast = "broadcast",
    Permissionless = "permissionless",
    Permissioned = "permissioned",
    Holochain = "holochain",
    HolochainChannel = "holochainChannel"
}

export function sharingTypeFromString(str: string): SharingType {
    switch(str) {
        case 'broadcast':
            return SharingType.Broadcast
        case 'permissionless':
            return SharingType.Permissionless
        case 'permissioned':
            return SharingType.Permissioned
        case 'holochain':
            return SharingType.Holochain
        case 'holochainChannel':
            return SharingType.HolochainChannel
        default:
            throw new Error(`Not a SharingType string: ${str}`)
    }
}

export default class SharedPerspective {
    name: string
    description: string
    type: SharingType
    linkLanguages: LanguageRef[]
    allowedExpressionLanguages: Address[]
    requiredExpressionLanguages: Address[]

    constructor(name: string, description: string, type: SharingType) {
        this.name = name
        this.description = description
        this.type = type
        this.linkLanguages = []
        this.allowedExpressionLanguages = []
        this.requiredExpressionLanguages = []
    }
}