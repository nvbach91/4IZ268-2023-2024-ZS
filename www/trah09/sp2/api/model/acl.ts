import { AclDefinition as acl } from '@contember/schema-definition'

export const adminRole = acl.createRole('admin', {
	s3: {
		'**': {
			upload: true,
			read: true,
		},
	},
})

export const publicRole = acl.createRole('public', {
	s3: {
		'**': {
			upload: false,
			read: true,
		},
	},
})
