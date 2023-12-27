import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { CourseLocale } from './Course'
import { GeneralLocale } from './General'
import { GenericPageLocale } from './GenericPage'
import { HeaderLocale } from './Header'
import { HomePageLocale } from './HomePage'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Locale {
	code = d.stringColumn().unique().notNull()
	label = d.stringColumn()
	order = d.intColumn().notNull().default(0)

	generals = d.oneHasMany(GeneralLocale, 'locale')
	headers = d.oneHasMany(HeaderLocale, 'locale')
	genericPages = d.oneHasMany(GenericPageLocale, 'locale')

	homePages = d.oneHasMany(HomePageLocale, 'locale')
	courses = d.oneHasMany(CourseLocale, 'locale')
}
