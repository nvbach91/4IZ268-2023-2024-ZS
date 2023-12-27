import type { ValueTypes } from '../../generated/contember/zeus'
import { FormFieldsFragment } from './FormFieldsFragment'
import type { FragmentOf } from './FragmentOf'
import { ImageFragment } from './ImageFragment'
import { SocialLinkListFragment } from './SocialLinkListFragment'

export const HomePageLocaleFragment = () => {
	return {
		title: true,
		description: true,
		image: [{}, ImageFragment()],
		formFields: [{}, FormFieldsFragment()],
		root: [
			{},
			{
				address: true,
				email: true,
				tel: true,
				socials: [{}, SocialLinkListFragment()],
				locales: [{}, { id: true, locale: [{}, { code: true }], link: [{}, { id: true, url: true }] }],
			},
		],
	} satisfies ValueTypes['HomePageLocale']
}

export type HomePageResult = FragmentOf<'HomePageLocale', typeof HomePageLocaleFragment>
export type HomePageLocalesResult = NonNullable<
	FragmentOf<'HomePageLocale', typeof HomePageLocaleFragment>['root']
>['locales']
