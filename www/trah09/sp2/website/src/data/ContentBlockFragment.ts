import type { ValueTypes } from '../../generated/contember/zeus'
import { ContentBlockReferencesBaseFragment } from './ContentBlockReferencesBaseFragment'
import type { FragmentOf } from './FragmentOf'

export const ContentBlockFragment = () => {
	return {
		id: true,
		json: true,
		references: [{}, ContentBlockReferencesBaseFragment()],
	} satisfies ValueTypes['ContentBlock']
}

export type ContentBlockResult = FragmentOf<'ContentBlock', typeof ContentBlockFragment>
