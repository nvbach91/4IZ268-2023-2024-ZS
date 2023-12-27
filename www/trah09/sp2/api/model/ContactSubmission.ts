import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { publicRole } from './acl'

@acl.allow(publicRole, { create: true })
export class ContactSubmission {
	createdAt = d.dateTimeColumn().default('now').notNull()

	email = d.stringColumn()
	name = d.stringColumn()
	text = d.stringColumn()
}
