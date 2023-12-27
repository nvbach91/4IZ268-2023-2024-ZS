import { EditPage, TextField } from '@contember/admin'
import { LinkListField, LocaleSideDimension } from '@mangoweb/contember-plugins'

export default () => (
	<EditPage
		entity="Header(unique = One)"
		setOnCreate="(unique = One)"
		rendererProps={{
			title: 'Header',
		}}
	>
		<LocaleSideDimension>
			<TextField field="title" label="Title" />
			<LinkListField field="links" label="Links" />
		</LocaleSideDimension>
	</EditPage>
)
