import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { GenericPageLocale } from './GenericPage'
import { HomePageLocale } from './HomePage'
import { Redirect } from './Redirect'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class Linkable {
	url = d.stringColumn().notNull().unique()

	genericPage = d.oneHasOne(GenericPageLocale, 'link').cascadeOnDelete()
	homePage = d.oneHasOne(HomePageLocale, 'link').cascadeOnDelete()

	redirect = d.oneHasOne(Redirect, 'link').cascadeOnDelete()
}
