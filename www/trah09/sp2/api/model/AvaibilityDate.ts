import { AclDefinition as acl, SchemaDefinition as d } from '@contember/schema-definition'
import { Course } from './Course'
import { Reservation } from './Reservation'
import { publicRole } from './acl'

@acl.allow(publicRole, { read: true })
export class AvaibilityDate {
	course = d.manyHasOne(Course, 'avaibilityDates').notNull().cascadeOnDelete()

	order = d.intColumn().notNull()
	dateTime = d.dateTimeColumn().notNull()
	numberOfPeople = d.intColumn().notNull().default(1)

	numberOfOccupiedPlaces = d.intColumn().notNull().default(0)

	reservation = d.oneHasMany(Reservation, 'avaibilityDate')
}
