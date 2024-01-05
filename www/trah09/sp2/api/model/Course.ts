import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { AvaibilityDate } from './AvaibilityDate'
import { Locale } from './Locale'
import { One } from './One'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Course {
	unique = d.enumColumn(One).notNull().unique()
	locales = d.oneHasMany(CourseLocale, 'root')

	avaibilityDates = d.oneHasMany(AvaibilityDate, 'course')
}

@acl.allow(publicRole, { read: true })
@d.Unique('root', 'locale')
export class CourseLocale {
	root = d.manyHasOne(Course, 'locales').notNull().cascadeOnDelete()
	locale = d.manyHasOne(Locale, 'courses').notNull().cascadeOnDelete()

	title = d.stringColumn()
}
