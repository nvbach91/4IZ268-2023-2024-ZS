import type { ValueTypes } from '../../generated/contember/zeus'
import { ContentFragment } from './ContentFragment'
import type { FragmentOf } from './FragmentOf'
import { SeoFragment } from './SeoFragment'

export const GenericPageLocaleFragment = () => {
	return {
		title: true,
		content: [{}, ContentFragment()],
		seo: [{}, SeoFragment()],
	} satisfies ValueTypes['GenericPageLocale']
}

export type GenericPageLocaleResult = FragmentOf<'GenericPageLocale', typeof GenericPageLocaleFragment>
