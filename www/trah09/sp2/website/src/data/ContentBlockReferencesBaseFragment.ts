import type { ValueTypes } from '../../generated/contember/zeus'
import { ContentReferenceLinkableItemFragment } from './ContentReferenceLinkableItemFragment'
import { EmbedFragment } from './EmbedFragment'
import type { FragmentOf } from './FragmentOf'
import { ImageFragment } from './ImageFragment'
import { LinkFragment } from './LinkFragment'

export const ContentBlockReferencesBaseFragment = () => {
	return {
		id: true,
		type: true,

		primaryText: true,
		link: [{}, LinkFragment()],
		image: [{}, ImageFragment()],
		linkables: [{}, ContentReferenceLinkableItemFragment()],
		embed: [{}, EmbedFragment()],
	} satisfies ValueTypes['ContentReference']
}

export type ContentBlockReferencesBaseResult = FragmentOf<'ContentReference', typeof ContentBlockReferencesBaseFragment>
