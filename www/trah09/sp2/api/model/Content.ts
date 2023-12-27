import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Embed } from './Embed'
import { Image } from './Image'
import { Link } from './Link'
import { Linkable } from './Linkable'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Content {
	blocks = d.oneHasMany(ContentBlock, 'content').orderBy('order')
}

@acl.allow(publicRole, { read: true })
export class ContentBlock {
	content = d.manyHasOne(Content, 'blocks').cascadeOnDelete().notNull()
	order = d.intColumn().notNull()
	json = d.stringColumn().notNull()
	references = d.oneHasMany(ContentReference, 'block')
}

export const ContentReferenceType = d.createEnum(
	'image', // image
	'linkables', // primaryText, linkables
	'embed', // embed
	'link', // link
)

@acl.allow(publicRole, { read: true })
export class ContentReference {
	block = d.manyHasOne(ContentBlock, 'references').cascadeOnDelete().notNull()
	type = d.enumColumn(ContentReferenceType).notNull()

	primaryText = d.stringColumn()
	image = d.manyHasOne(Image).setNullOnDelete()
	linkables = d.oneHasMany(ContentReferenceLinkableItem, 'reference')
	embed = d.oneHasOne(Embed).setNullOnDelete()
	link = d.oneHasOne(Link).removeOrphan().setNullOnDelete()
}

@acl.allow(publicRole, { read: true })
@d.View(/* sql */ `
	SELECT
		gen_random_uuid() AS id,
		I.id as item_id,
		C.id as reference_id
	FROM linkable as I
	CROSS JOIN content_reference as C
	WHERE C.type = 'linkables'
`)
export class ContentReferenceLinkableItem {
	reference = d.manyHasOne(ContentReference, 'linkables').notNull()
	item = d.oneHasOne(Linkable).notNull()
}
