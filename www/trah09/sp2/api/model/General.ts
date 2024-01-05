import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Image } from './Image'
import { Locale } from './Locale'
import { One } from './One'
import { Seo } from './Seo'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class General {
	unique = d.enumColumn(One).notNull().unique()

	// @TODO: Remove these examples in production.
	dummyText = d.stringColumn()
	dummyImage = d.manyHasOne(Image).setNullOnDelete()

	// Webmanifest
	// @TODO: move ro GeneralLocale
	name = d.stringColumn()
	shortName = d.stringColumn()

	locales = d.oneHasMany(GeneralLocale, 'root')
}

@acl.allow(publicRole, { read: true })
@d.Unique('root', 'locale')
export class GeneralLocale {
	root = d.manyHasOne(General, 'locales').notNull().cascadeOnDelete()
	locale = d.manyHasOne(Locale, 'generals').notNull().cascadeOnDelete()

	seo = d.oneHasOne(Seo).setNullOnDelete()
}
