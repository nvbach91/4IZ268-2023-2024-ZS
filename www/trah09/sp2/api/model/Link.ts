import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Linkable } from './Linkable'
import { publicRole } from './acl'

export const LinkType = d.createEnum('internal', 'external')

@acl.allow(publicRole, { read: true })
export class Link {
	type = d.enumColumn(LinkType).notNull()
	title = d.stringColumn()
	isTargetBlank = d.boolColumn().default(false).notNull()
	externalLink = d.stringColumn()
	internalLink = d.manyHasOne(Linkable).setNullOnDelete()
}
