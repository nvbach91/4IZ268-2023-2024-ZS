import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'
import { LinkListFragment } from './LinkListFragment'

export const HeaderFragment = (locale: string) => {
	return {
		localesByLocale: [
			{
				by: {
					locale: {
						code: locale,
					},
				},
			},
			{
				title: true,
				links: [{}, LinkListFragment()],
			},
		],
	} satisfies ValueTypes['Header']
}

export type HeaderResult = FragmentOf<'Header', typeof HeaderFragment>
