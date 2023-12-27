import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'
import { LinkFragment } from './LinkFragment'

export const LinkListFragment = () => {
	return {
		items: [
			{},
			{
				id: true,
				link: [{}, LinkFragment()],
			},
		],
	} satisfies ValueTypes['LinkList']
}

export type LinkListResult = FragmentOf<'LinkList', typeof LinkListFragment>
