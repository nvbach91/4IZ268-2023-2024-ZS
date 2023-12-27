import { DetailPage } from '@contember/admin'
import type { FilledFormRendererProps } from '../components/FilledFormRenderer'
import { FilledFormRenderer } from '../components/FilledFormRenderer'

const fields: FilledFormRendererProps['fields'] = [
	{ field: 'submittedAt', label: 'Submitted at', type: 'date' },
	{ field: 'avaibilityDate.dateTime', label: 'Avaibility date', type: 'date' },
	{ field: 'numberOfPeople', label: 'Number of people', type: 'number' },
	{ field: 'name', label: 'Name', type: 'string' },
	{ field: 'email', label: 'Email', type: 'string' },
	{ field: 'tel', label: 'Tel', type: 'string' },
	{ field: 'note', label: 'Note', type: 'string' },
]

export default () => (
	<DetailPage entity="Reservation(id=$id)" rendererProps={{ title: 'Filled reservation form' }}>
		<FilledFormRenderer fields={fields} />
	</DetailPage>
)
