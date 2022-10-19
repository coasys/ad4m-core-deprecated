[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [language/Language](../modules/language_Language.md) / LinkSyncAdapter

# Interface: LinkSyncAdapter

[language/Language](../modules/language_Language.md).LinkSyncAdapter

## Table of contents

### Methods

- [addCallback](language_Language.LinkSyncAdapter.md#addcallback)
- [commit](language_Language.LinkSyncAdapter.md#commit)
- [currentRevision](language_Language.LinkSyncAdapter.md#currentrevision)
- [latestRevision](language_Language.LinkSyncAdapter.md#latestrevision)
- [others](language_Language.LinkSyncAdapter.md#others)
- [public](language_Language.LinkSyncAdapter.md#public)
- [pull](language_Language.LinkSyncAdapter.md#pull)
- [render](language_Language.LinkSyncAdapter.md#render)
- [writable](language_Language.LinkSyncAdapter.md#writable)

## Methods

### addCallback

▸ **addCallback**(`callback`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`PerspectiveDiffObserver`](../modules/language_Language.md#perspectivediffobserver) |

#### Returns

`any`

#### Defined in

[language/Language.ts:138](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L138)

___

### commit

▸ **commit**(`diff`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `diff` | [`PerspectiveDiff`](../classes/perspectives_PerspectiveDiff.PerspectiveDiff.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[language/Language.ts:135](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L135)

___

### currentRevision

▸ **currentRevision**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[language/Language.ts:126](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L126)

___

### latestRevision

▸ **latestRevision**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[language/Language.ts:123](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L123)

___

### others

▸ **others**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[language/Language.ts:119](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L119)

___

### public

▸ **public**(): `boolean`

#### Returns

`boolean`

#### Defined in

[language/Language.ts:118](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L118)

___

### pull

▸ **pull**(): `Promise`<[`PerspectiveDiff`](../classes/perspectives_PerspectiveDiff.PerspectiveDiff.md)\>

#### Returns

`Promise`<[`PerspectiveDiff`](../classes/perspectives_PerspectiveDiff.PerspectiveDiff.md)\>

#### Defined in

[language/Language.ts:129](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L129)

___

### render

▸ **render**(): `Promise`<[`Perspective`](../classes/perspectives_Perspective.Perspective.md)\>

#### Returns

`Promise`<[`Perspective`](../classes/perspectives_Perspective.Perspective.md)\>

#### Defined in

[language/Language.ts:132](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L132)

___

### writable

▸ **writable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[language/Language.ts:117](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L117)
