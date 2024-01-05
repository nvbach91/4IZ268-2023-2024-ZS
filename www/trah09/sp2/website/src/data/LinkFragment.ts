import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const LinkFragment = () => {
	return {
		id: true,
		title: true,
		isTargetBlank: true,
		type: true,
		internalLink: [
			{},
			{
				url: true,
			},
		],
		externalLink: true,
	} satisfies ValueTypes['Link']
}

export type LinkResult = FragmentOf<'Link', typeof LinkFragment>
