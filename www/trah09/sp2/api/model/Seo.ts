import { AclDefinition as acl } from '@contember/schema-definition'
import { Seo } from '@mangoweb/contember-plugins/dist/seo/api/model'
import { publicRole } from './acl'

acl.allow(publicRole, { read: true })(Seo)

export { Seo }
