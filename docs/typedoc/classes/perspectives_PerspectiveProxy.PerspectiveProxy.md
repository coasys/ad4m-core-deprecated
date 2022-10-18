[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [perspectives/PerspectiveProxy](../modules/perspectives_PerspectiveProxy.md) / PerspectiveProxy

# Class: PerspectiveProxy

[perspectives/PerspectiveProxy](../modules/perspectives_PerspectiveProxy.md).PerspectiveProxy

## Table of contents

### Constructors

- [constructor](perspectives_PerspectiveProxy.PerspectiveProxy.md#constructor)

### Properties

- [#client](perspectives_PerspectiveProxy.PerspectiveProxy.md##client)
- [#executeAction](perspectives_PerspectiveProxy.PerspectiveProxy.md##executeaction)
- [#handle](perspectives_PerspectiveProxy.PerspectiveProxy.md##handle)
- [#perspectiveLinkAddedCallbacks](perspectives_PerspectiveProxy.PerspectiveProxy.md##perspectivelinkaddedcallbacks)
- [#perspectiveLinkRemovedCallbacks](perspectives_PerspectiveProxy.PerspectiveProxy.md##perspectivelinkremovedcallbacks)

### Accessors

- [name](perspectives_PerspectiveProxy.PerspectiveProxy.md#name)
- [neighbourhood](perspectives_PerspectiveProxy.PerspectiveProxy.md#neighbourhood)
- [sharedUrl](perspectives_PerspectiveProxy.PerspectiveProxy.md#sharedurl)
- [uuid](perspectives_PerspectiveProxy.PerspectiveProxy.md#uuid)

### Methods

- [add](perspectives_PerspectiveProxy.PerspectiveProxy.md#add)
- [addListener](perspectives_PerspectiveProxy.PerspectiveProxy.md#addlistener)
- [availableFlows](perspectives_PerspectiveProxy.PerspectiveProxy.md#availableflows)
- [expressionsInFlowState](perspectives_PerspectiveProxy.PerspectiveProxy.md#expressionsinflowstate)
- [flowActions](perspectives_PerspectiveProxy.PerspectiveProxy.md#flowactions)
- [flowState](perspectives_PerspectiveProxy.PerspectiveProxy.md#flowstate)
- [get](perspectives_PerspectiveProxy.PerspectiveProxy.md#get)
- [getSingleTarget](perspectives_PerspectiveProxy.PerspectiveProxy.md#getsingletarget)
- [infer](perspectives_PerspectiveProxy.PerspectiveProxy.md#infer)
- [loadSnapshot](perspectives_PerspectiveProxy.PerspectiveProxy.md#loadsnapshot)
- [remove](perspectives_PerspectiveProxy.PerspectiveProxy.md#remove)
- [removeListener](perspectives_PerspectiveProxy.PerspectiveProxy.md#removelistener)
- [runFlowAction](perspectives_PerspectiveProxy.PerspectiveProxy.md#runflowaction)
- [sdnaFlows](perspectives_PerspectiveProxy.PerspectiveProxy.md#sdnaflows)
- [setSingleTarget](perspectives_PerspectiveProxy.PerspectiveProxy.md#setsingletarget)
- [snapshot](perspectives_PerspectiveProxy.PerspectiveProxy.md#snapshot)
- [startFlow](perspectives_PerspectiveProxy.PerspectiveProxy.md#startflow)
- [update](perspectives_PerspectiveProxy.PerspectiveProxy.md#update)

## Constructors

### constructor

• **new PerspectiveProxy**(`handle`, `ad4m`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`PerspectiveHandle`](perspectives_PerspectiveHandle.PerspectiveHandle.md) |
| `ad4m` | [`PerspectiveClient`](perspectives_PerspectiveClient.PerspectiveClient.md) |

#### Defined in

[perspectives/PerspectiveProxy.ts:17](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L17)

## Properties

### #client

• `Private` **#client**: [`PerspectiveClient`](perspectives_PerspectiveClient.PerspectiveClient.md)

#### Defined in

[perspectives/PerspectiveProxy.ts:12](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L12)

___

### #executeAction

• `Private` **#executeAction**: `any`

#### Defined in

[perspectives/PerspectiveProxy.ts:15](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L15)

___

### #handle

• `Private` **#handle**: [`PerspectiveHandle`](perspectives_PerspectiveHandle.PerspectiveHandle.md)

#### Defined in

[perspectives/PerspectiveProxy.ts:11](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L11)

___

### #perspectiveLinkAddedCallbacks

• `Private` **#perspectiveLinkAddedCallbacks**: [`LinkCallback`](../modules/perspectives_PerspectiveClient.md#linkcallback)[]

#### Defined in

[perspectives/PerspectiveProxy.ts:13](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L13)

___

### #perspectiveLinkRemovedCallbacks

• `Private` **#perspectiveLinkRemovedCallbacks**: [`LinkCallback`](../modules/perspectives_PerspectiveClient.md#linkcallback)[]

#### Defined in

[perspectives/PerspectiveProxy.ts:14](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L14)

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[perspectives/PerspectiveProxy.ts:62](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L62)

___

### neighbourhood

• `get` **neighbourhood**(): `void` \| [`Neighbourhood`](neighbourhood_Neighbourhood.Neighbourhood.md)

#### Returns

`void` \| [`Neighbourhood`](neighbourhood_Neighbourhood.Neighbourhood.md)

#### Defined in

[perspectives/PerspectiveProxy.ts:70](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L70)

___

### sharedUrl

• `get` **sharedUrl**(): `string` \| `void`

#### Returns

`string` \| `void`

#### Defined in

[perspectives/PerspectiveProxy.ts:66](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L66)

___

### uuid

• `get` **uuid**(): `string`

#### Returns

`string`

#### Defined in

[perspectives/PerspectiveProxy.ts:58](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L58)

## Methods

### add

▸ **add**(`link`): `Promise`<[`LinkExpression`](links_Links.LinkExpression.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `link` | [`Link`](links_Links.Link.md) |

#### Returns

`Promise`<[`LinkExpression`](links_Links.LinkExpression.md)\>

#### Defined in

[perspectives/PerspectiveProxy.ts:82](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L82)

___

### addListener

▸ **addListener**(`type`, `cb`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `PerspectiveListenerTypes` |
| `cb` | [`LinkCallback`](../modules/perspectives_PerspectiveClient.md#linkcallback) |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:94](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L94)

___

### availableFlows

▸ **availableFlows**(`exprAddr`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `exprAddr` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[perspectives/PerspectiveProxy.ts:160](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L160)

___

### expressionsInFlowState

▸ **expressionsInFlowState**(`flowName`, `flowState`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowName` | `string` |
| `flowState` | `number` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[perspectives/PerspectiveProxy.ts:174](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L174)

___

### flowActions

▸ **flowActions**(`flowName`, `exprAddr`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowName` | `string` |
| `exprAddr` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[perspectives/PerspectiveProxy.ts:186](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L186)

___

### flowState

▸ **flowState**(`flowName`, `exprAddr`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowName` | `string` |
| `exprAddr` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:180](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L180)

___

### get

▸ **get**(`query`): `Promise`<[`LinkExpression`](links_Links.LinkExpression.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`LinkQuery`](perspectives_LinkQuery.LinkQuery.md) |

#### Returns

`Promise`<[`LinkExpression`](links_Links.LinkExpression.md)[]\>

#### Defined in

[perspectives/PerspectiveProxy.ts:74](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L74)

___

### getSingleTarget

▸ **getSingleTarget**(`query`): `Promise`<`string` \| `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`LinkQuery`](perspectives_LinkQuery.LinkQuery.md) |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:131](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L131)

___

### infer

▸ **infer**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:78](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L78)

___

### loadSnapshot

▸ **loadSnapshot**(`snapshot`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `snapshot` | [`Perspective`](perspectives_Perspective.Perspective.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:118](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L118)

___

### remove

▸ **remove**(`link`): `Promise`<{ `perspectiveRemoveLink`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `link` | [`LinkExpression`](links_Links.LinkExpression.md) |

#### Returns

`Promise`<{ `perspectiveRemoveLink`: `boolean`  }\>

#### Defined in

[perspectives/PerspectiveProxy.ts:90](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L90)

___

### removeListener

▸ **removeListener**(`type`, `cb`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `PerspectiveListenerTypes` |
| `cb` | [`LinkCallback`](../modules/perspectives_PerspectiveClient.md#linkcallback) |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:102](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L102)

___

### runFlowAction

▸ **runFlowAction**(`flowName`, `exprAddr`, `actionName`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowName` | `string` |
| `exprAddr` | `string` |
| `actionName` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:192](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L192)

___

### sdnaFlows

▸ **sdnaFlows**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[perspectives/PerspectiveProxy.ts:154](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L154)

___

### setSingleTarget

▸ **setSingleTarget**(`link`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `link` | [`Link`](links_Links.Link.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:140](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L140)

___

### snapshot

▸ **snapshot**(): `Promise`<[`Perspective`](perspectives_Perspective.Perspective.md)\>

#### Returns

`Promise`<[`Perspective`](perspectives_Perspective.Perspective.md)\>

#### Defined in

[perspectives/PerspectiveProxy.ts:114](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L114)

___

### startFlow

▸ **startFlow**(`flowName`, `exprAddr`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowName` | `string` |
| `exprAddr` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[perspectives/PerspectiveProxy.ts:166](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L166)

___

### update

▸ **update**(`oldLink`, `newLink`): `Promise`<[`LinkExpression`](links_Links.LinkExpression.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldLink` | [`LinkExpression`](links_Links.LinkExpression.md) |
| `newLink` | [`Link`](links_Links.Link.md) |

#### Returns

`Promise`<[`LinkExpression`](links_Links.LinkExpression.md)\>

#### Defined in

[perspectives/PerspectiveProxy.ts:86](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/PerspectiveProxy.ts#L86)
