import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { LinkList } from './LinkList'
import { Locale } from './Locale'
import { One } from './One'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Header {
	unique = d.enumColumn(One).notNull().unique()

	locales = d.oneHasMany(HeaderLocale, 'root')
}

@acl.allow(publicRole, { read: true })
@d.Unique('root', 'locale')
export class HeaderLocale {
	root = d.manyHasOne(Header, 'locales').notNull().cascadeOnDelete()
	locale = d.manyHasOne(Locale, 'headers').notNull().cascadeOnDelete()

	title = d.stringColumn()
	links = d.oneHasOne(LinkList).setNullOnDelete()
}
