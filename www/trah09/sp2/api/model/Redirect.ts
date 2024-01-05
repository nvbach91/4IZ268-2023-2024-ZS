import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Link } from './Link'
import { Linkable } from './Linkable'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Redirect {
	link = d.oneHasOneInverse(Linkable, 'redirect').notNull()
	note = d.stringColumn()
	target = d.oneHasOne(Link).notNull().cascadeOnDelete()
}
