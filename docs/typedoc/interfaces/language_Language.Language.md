[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [language/Language](../modules/language_Language.md) / Language

# Interface: Language

[language/Language](../modules/language_Language.md).Language

## Table of contents

### Properties

- [directMessageAdapter](language_Language.Language.md#directmessageadapter)
- [expressionAdapter](language_Language.Language.md#expressionadapter)
- [expressionUI](language_Language.Language.md#expressionui)
- [getAllAdapter](language_Language.Language.md#getalladapter)
- [getByAuthorAdapter](language_Language.Language.md#getbyauthoradapter)
- [languageAdapter](language_Language.Language.md#languageadapter)
- [linksAdapter](language_Language.Language.md#linksadapter)
- [name](language_Language.Language.md#name)
- [settingsUI](language_Language.Language.md#settingsui)

### Methods

- [interactions](language_Language.Language.md#interactions)
- [isImmutableExpression](language_Language.Language.md#isimmutableexpression)

## Properties

### directMessageAdapter

• `Optional` `Readonly` **directMessageAdapter**: [`DirectMessageAdapter`](language_Language.DirectMessageAdapter.md)

#### Defined in

[language/Language.ts:28](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L28)

___

### expressionAdapter

• `Optional` `Readonly` **expressionAdapter**: [`ExpressionAdapter`](language_Language.ExpressionAdapter.md)

#### Defined in

[language/Language.ts:18](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L18)

___

### expressionUI

• `Optional` `Readonly` **expressionUI**: [`ExpressionUI`](language_Language.ExpressionUI.md)

#### Defined in

[language/Language.ts:32](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L32)

___

### getAllAdapter

• `Optional` `Readonly` **getAllAdapter**: [`GetAllAdapter`](language_Language.GetAllAdapter.md)

#### Defined in

[language/Language.ts:26](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L26)

___

### getByAuthorAdapter

• `Optional` `Readonly` **getByAuthorAdapter**: [`GetByAuthorAdapter`](language_Language.GetByAuthorAdapter.md)

#### Defined in

[language/Language.ts:24](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L24)

___

### languageAdapter

• `Optional` `Readonly` **languageAdapter**: [`LanguageAdapter`](language_Language.LanguageAdapter.md)

#### Defined in

[language/Language.ts:21](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L21)

___

### linksAdapter

• `Optional` `Readonly` **linksAdapter**: [`LinkSyncAdapter`](language_Language.LinkSyncAdapter.md)

#### Defined in

[language/Language.ts:30](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L30)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[language/Language.ts:9](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L9)

___

### settingsUI

• `Optional` `Readonly` **settingsUI**: [`SettingsUI`](language_Language.SettingsUI.md)

#### Defined in

[language/Language.ts:33](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L33)

## Methods

### interactions

▸ **interactions**(`expression`): [`Interaction`](language_Language.Interaction.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Interaction`](language_Language.Interaction.md)[]

#### Defined in

[language/Language.ts:36](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L36)

___

### isImmutableExpression

▸ `Optional` **isImmutableExpression**(`expression`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`boolean`

#### Defined in

[language/Language.ts:13](https://github.com/perspect3vism/ad4m/blob/cbcbd30/src/language/Language.ts#L13)
