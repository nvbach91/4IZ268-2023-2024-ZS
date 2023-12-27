import type { ValueTypes } from '../../generated/contember/zeus'
import { ContentBlockFragment } from './ContentBlockFragment'
import type { FragmentOf } from './FragmentOf'

export const ContentFragment = () => {
	return {
		blocks: [{}, ContentBlockFragment()],
	} satisfies ValueTypes['Content']
}

export type ContentResult = FragmentOf<'Content', typeof ContentFragment>
