import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const AvaibilityDateFragment = () => {
	return {
		id: true,
		order: true,
		dateTime: true,
		numberOfPeople: true,
		numberOfOccupiedPlaces: true,
	} satisfies ValueTypes['AvaibilityDate']
}

export type AvaibilityDateFragment = FragmentOf<'AvaibilityDate', typeof AvaibilityDateFragment>
