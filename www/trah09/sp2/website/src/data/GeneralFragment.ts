import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'
import { ImageFragment } from './ImageFragment'
import { SeoFragment } from './SeoFragment'

export const GeneralFragment = (locale: string) => {
	return {
		dummyText: true,
		dummyImage: [{}, ImageFragment()],
		localesByLocale: [
			{
				by: {
					locale: {
						code: locale,
					},
				},
			},
			{
				seo: [{}, SeoFragment()],
			},
		],
	} satisfies ValueTypes['General']
}

export type GeneralResult = FragmentOf<'General', typeof GeneralFragment>
