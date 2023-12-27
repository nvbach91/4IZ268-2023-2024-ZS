import { createSchema, PermissionsBuilder } from '@contember/schema-definition'
import * as model from './model'

export default createSchema(model, (schema) => ({
	...schema,
	acl: {
		...schema.acl,
		roles: {
			...schema.acl.roles,
			admin: {
				...schema.acl.roles.admin,
				entities: PermissionsBuilder.create(schema.model).allowAll().allowCustomPrimary().permissions,
			},
		},
	},
}))
