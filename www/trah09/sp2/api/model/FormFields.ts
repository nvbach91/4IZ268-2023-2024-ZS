import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class FormFields {
	successMessage = d.stringColumn()
	errorMessage = d.stringColumn()

	name = d.stringColumn()
	nameRequiredMessage = d.stringColumn()

	email = d.stringColumn()
	emailRequiredMessage = d.stringColumn()

	phone = d.stringColumn()
	phoneRequiredMessage = d.stringColumn()

	numberOfPeople = d.stringColumn()
	vacancies = d.stringColumn()
	date = d.stringColumn()
	note = d.stringColumn()

	submitButtonLabel = d.stringColumn()
}
