import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Link } from './Link'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class LinkList {
	items = d.oneHasMany(LinkListItem, 'list').orderBy('order')
}

@acl.allow(publicRole, { read: true })
export class LinkListItem {
	list = d.manyHasOne(LinkList, 'items').cascadeOnDelete().notNull()

	order = d.intColumn().notNull().default(0)
	link = d.oneHasOne(Link).setNullOnDelete()
}
