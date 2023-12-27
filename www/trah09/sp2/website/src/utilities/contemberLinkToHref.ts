import type { LinkResult } from '../data/LinkFragment'
import { isDefined } from './isDefined'

export const contemberLinkToHref = (link: LinkResult): string => {
	if (link.type === 'external' && isDefined(link.externalLink)) {
		return link.externalLink
	}
	if (link.type === 'internal' && isDefined(link.internalLink)) {
		return link.internalLink.url
	}
	console.warn('Invalid link', link)
	return ''
}

export const contemberLinkToHrefTargetRel = (link: LinkResult) => ({
	href: contemberLinkToHref(link),
	target: link.isTargetBlank ? '_blank' : undefined,
	rel: link.isTargetBlank ? 'noreferrer' : undefined,
})
