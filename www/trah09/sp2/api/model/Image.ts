import { AclDefinition as acl } from '@contember/schema-definition'
import { Image } from '@mangoweb/contember-plugins/dist/image/api/model'
import { publicRole } from './acl'

acl.allow(publicRole, { read: true })(Image)

export { Image }
