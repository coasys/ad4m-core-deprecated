[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [language/Language](../modules/language_Language.md) / TelepresenceAdapter

# Interface: TelepresenceAdapter

[language/Language](../modules/language_Language.md).TelepresenceAdapter

## Table of contents

### Methods

- [getOnlineAgents](language_Language.TelepresenceAdapter.md#getonlineagents)
- [registerRpcCallback](language_Language.TelepresenceAdapter.md#registerrpccallback)
- [rpcCall](language_Language.TelepresenceAdapter.md#rpccall)
- [setOnlineStatus](language_Language.TelepresenceAdapter.md#setonlinestatus)

## Methods

### getOnlineAgents

▸ **getOnlineAgents**(): [[`OnlineAgent`](../classes/language_Language.OnlineAgent.md)]

#### Returns

[[`OnlineAgent`](../classes/language_Language.OnlineAgent.md)]

#### Defined in

[language/Language.ts:213](https://github.com/perspect3vism/ad4m/blob/b065749/src/language/Language.ts#L213)

___

### registerRpcCallback

▸ **registerRpcCallback**(`callback`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`TelepresenceRpcCall`](../classes/language_Language.TelepresenceRpcCall.md) |

#### Returns

`any`

#### Defined in

[language/Language.ts:216](https://github.com/perspect3vism/ad4m/blob/b065749/src/language/Language.ts#L216)

___

### rpcCall

▸ **rpcCall**(`remoteAgentDid`, `call`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteAgentDid` | `string` |
| `call` | [`TelepresenceRpcCall`](../classes/language_Language.TelepresenceRpcCall.md) |

#### Returns

`object`

#### Defined in

[language/Language.ts:215](https://github.com/perspect3vism/ad4m/blob/b065749/src/language/Language.ts#L215)

___

### setOnlineStatus

▸ **setOnlineStatus**(`status`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `string` |

#### Returns

`any`

#### Defined in

[language/Language.ts:212](https://github.com/perspect3vism/ad4m/blob/b065749/src/language/Language.ts#L212)
