import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Content } from './Content'
import { Linkable } from './Linkable'
import { Locale } from './Locale'
import { Seo } from './Seo'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class GenericPage {
	locales = d.oneHasMany(GenericPageLocale, 'root')
}

@acl.allow(publicRole, { read: true })
@d.Unique('root', 'locale')
export class GenericPageLocale {
	root = d.manyHasOne(GenericPage, 'locales').notNull().cascadeOnDelete()
	locale = d.manyHasOne(Locale, 'genericPages').notNull().cascadeOnDelete()

	link = d.oneHasOneInverse(Linkable, 'genericPage').notNull()
	title = d.stringColumn()
	content = d.oneHasOne(Content).setNullOnDelete()
	seo = d.oneHasOne(Seo).setNullOnDelete()
}
