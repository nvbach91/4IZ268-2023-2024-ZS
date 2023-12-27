import { DateTimeField, EditPage, NumberField, Repeater, TextField } from '@contember/admin'
import { LocaleSideDimension } from '@mangoweb/contember-plugins'

export default () => (
	<EditPage
		pageName="course"
		entity="Course(unique=One)"
		setOnCreate="(unique = One)"
		rendererProps={{ title: 'Course' }}
	>
		<LocaleSideDimension>
			<TextField field="title" label="Title" />
		</LocaleSideDimension>
		<Repeater field="avaibilityDates" label="Avaibility date" sortableBy="order">
			<DateTimeField field="dateTime" label="Date" />
			<NumberField field="numberOfPeople" label="Number of people" />
			<NumberField field="numberOfOccupiedPlaces" label="Number of occupied places" />
		</Repeater>
	</EditPage>
)
