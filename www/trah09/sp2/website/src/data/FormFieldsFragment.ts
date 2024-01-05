import type { ValueTypes } from '../../generated/contember/zeus'
import type { FragmentOf } from './FragmentOf'

export const FormFieldsFragment = () => {
	return {
		successMessage: true,
		errorMessage: true,
		name: true,
		nameRequiredMessage: true,
		email: true,
		emailRequiredMessage: true,
		phone: true,
		phoneRequiredMessage: true,
		numberOfPeople: true,
		vacancies: true,
		date: true,
		note: true,
		submitButtonLabel: true,
	} satisfies ValueTypes['FormFields']
}

export type FormFieldsResult = FragmentOf<'FormFields', typeof FormFieldsFragment>
