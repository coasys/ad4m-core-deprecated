[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [perspectives/Perspective](../modules/perspectives_Perspective.md) / Perspective

# Class: Perspective

[perspectives/Perspective](../modules/perspectives_Perspective.md).Perspective

## Table of contents

### Constructors

- [constructor](perspectives_Perspective.Perspective.md#constructor)

### Properties

- [links](perspectives_Perspective.Perspective.md#links)

### Methods

- [get](perspectives_Perspective.Perspective.md#get)
- [getSingleTarget](perspectives_Perspective.Perspective.md#getsingletarget)

## Constructors

### constructor

• **new Perspective**(`links?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `links?` | [`LinkExpression`](links_Links.LinkExpression.md)[] |

#### Defined in

[perspectives/Perspective.ts:21](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/Perspective.ts#L21)

## Properties

### links

• **links**: [`LinkExpression`](links_Links.LinkExpression.md)[]

#### Defined in

[perspectives/Perspective.ts:19](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/Perspective.ts#L19)

## Methods

### get

▸ **get**(`query`): [`LinkExpression`](links_Links.LinkExpression.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`LinkQuery`](perspectives_LinkQuery.LinkQuery.md) |

#### Returns

[`LinkExpression`](links_Links.LinkExpression.md)[]

#### Defined in

[perspectives/Perspective.ts:29](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/Perspective.ts#L29)

___

### getSingleTarget

▸ **getSingleTarget**(`query`): `string` \| `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`LinkQuery`](perspectives_LinkQuery.LinkQuery.md) |

#### Returns

`string` \| `void`

#### Defined in

[perspectives/Perspective.ts:73](https://github.com/perspect3vism/ad4m/blob/2628235/src/perspectives/Perspective.ts#L73)
