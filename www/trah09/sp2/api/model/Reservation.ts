import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { AvaibilityDate } from './AvaibilityDate'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Reservation {
	avaibilityDate = d.manyHasOne(AvaibilityDate, 'reservation').notNull().cascadeOnDelete()

	submittedAt = d.dateTimeColumn().notNull().default('now')
	numberOfPeople = d.intColumn()

	name = d.stringColumn()
	email = d.stringColumn()
	tel = d.stringColumn()
	note = d.stringColumn()
}
