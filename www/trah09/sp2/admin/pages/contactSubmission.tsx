import { DataGridPage, DateCell, Field, GenericCell, TextCell } from '@contember/admin'
import { DeleteEntityButton } from '@mangoweb/contember-plugins'

export const list = () => {
	return (
		<DataGridPage
			entities="ContactSubmission"
			itemsPerPage={50}
			rendererProps={{
				title: 'Contact submissions',
			}}
		>
			<DateCell field="createdAt" header="Submitted at" initialOrder="desc" />
			<TextCell field="name" header="Name" />
			<TextCell field="email" header="Email" />
			<GenericCell header="Text">
				<div style={{ whiteSpace: 'normal' }}>
					<Field field="text" />
				</div>
			</GenericCell>
			<GenericCell canBeHidden={false} justification="justifyEnd" shrunk>
				<DeleteEntityButton title="Delete" immediatePersist />
			</GenericCell>
		</DataGridPage>
	)
}
