import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'
import { ImageFragment } from './ImageFragment'

export const SeoFragment = () => {
	return {
		title: true,
		ogTitle: true,
		description: true,
		ogDescription: true,
		ogImage: [{}, ImageFragment()],
		noFollow: true,
		noIndex: true,
	} satisfies ValueTypes['Seo']
}

export type SeoResult = FragmentOf<'Seo', typeof SeoFragment>
