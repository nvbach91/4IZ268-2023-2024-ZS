import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const ContentReferenceLinkableItemFragment = () => {
	return {
		id: true,
		item: [
			{},
			{
				url: true,
			},
		],
	} satisfies ValueTypes['ContentReferenceLinkableItem']
}

export type ContentReferenceLinkableItemResult = FragmentOf<
	'ContentReferenceLinkableItem',
	typeof ContentReferenceLinkableItemFragment
>
