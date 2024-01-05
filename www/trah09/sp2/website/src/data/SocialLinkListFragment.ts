import type { ValueTypes } from '../../generated/contember/zeus'

export const SocialLinkListFragment = () => {
	return {
		items: [{ orderBy: [{ order: 'asc' }] }, { socialLink: [{}, { type: true, url: true }] }],
	} satisfies ValueTypes['SocialLinkList']
}
