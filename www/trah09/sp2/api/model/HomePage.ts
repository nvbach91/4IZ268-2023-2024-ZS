import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { FormFields } from './FormFields'
import { Image } from './Image'
import { Linkable } from './Linkable'
import { Locale } from './Locale'
import { One } from './One'
import { Seo } from './Seo'
import { SocialLinkList } from './SocialLinkList'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class HomePage {
	unique = d.enumColumn(One).notNull().unique()
	locales = d.oneHasMany(HomePageLocale, 'root')

	address = d.stringColumn()
	email = d.stringColumn()
	tel = d.stringColumn()

	socials = d.oneHasOne(SocialLinkList).cascadeOnDelete()
}

@acl.allow(publicRole, { read: true })
@d.Unique('root', 'locale')
export class HomePageLocale {
	root = d.manyHasOne(HomePage, 'locales').cascadeOnDelete().notNull()
	locale = d.manyHasOne(Locale, 'homePages').cascadeOnDelete().notNull()
	seo = d.oneHasOne(Seo).cascadeOnDelete()

	link = d.oneHasOneInverse(Linkable, 'homePage').notNull()

	title = d.stringColumn()
	description = d.stringColumn()
	image = d.manyHasOne(Image)

	formFields = d.oneHasOne(FormFields).cascadeOnDelete()
}
