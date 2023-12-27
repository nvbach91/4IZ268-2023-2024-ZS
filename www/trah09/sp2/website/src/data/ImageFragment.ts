import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const ImageFragment = () => {
	return {
		id: true,
		url: true,
		width: true,
		height: true,
		alt: true,
	} satisfies ValueTypes['Image']
}

export type ImageResult = FragmentOf<'Image', typeof ImageFragment>
