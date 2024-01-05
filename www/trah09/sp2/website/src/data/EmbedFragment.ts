import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const EmbedFragment = () => {
	return {
		type: true,
		embedId: true,
	} satisfies ValueTypes['Embed']
}

export type EmbedResult = FragmentOf<'Embed', typeof EmbedFragment>
