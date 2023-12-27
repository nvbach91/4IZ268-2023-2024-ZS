import type { ValueTypes } from '../../generated/contember/zeus'
import { AvaibilityDateFragment } from './AvaibilityDateFragment'

export const CourseFragment = (locale: string) => {
	return {
		localesByLocale: [{ by: { locale: { code: locale } } }, { title: true }],
		avaibilityDates: [{ orderBy: [{ order: 'asc' }] }, AvaibilityDateFragment()],
	} satisfies ValueTypes['Course']
}
