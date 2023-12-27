import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { publicRole } from './acl'

export const SocialLinkType = d.createEnum('facebook', 'instagram')

@acl.allow(publicRole, { read: true })
export class SocialLinkList {
	items = d.oneHasMany(SocialLinkItem, 'list')
}

@acl.allow(publicRole, { read: true })
export class SocialLinkItem {
	list = d.manyHasOne(SocialLinkList, 'items')
	order = d.intColumn().notNull()
	socialLink = d.oneHasOne(SocialLink)
}

@acl.allow(publicRole, { read: true })
export class SocialLink {
	type = d.enumColumn(SocialLinkType)
	url = d.stringColumn()
}
