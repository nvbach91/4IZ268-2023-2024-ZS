import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { publicRole } from './acl'

export const EmbedType = d.createEnum('youtube', 'vimeo')

@acl.allow(publicRole, { read: true })
export class Embed {
	type = d.enumColumn(EmbedType).notNull()
	embedId = d.stringColumn()
}
