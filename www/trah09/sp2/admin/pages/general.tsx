import { Box, EditPage, TextField } from '@contember/admin'
import { ImageField, LocaleSideDimension, SeoField } from '@mangoweb/contember-plugins'

export default () => (
	<EditPage
		entity="General(unique = One)"
		setOnCreate="(unique = One)"
		rendererProps={{
			title: 'General',
		}}
	>
		<TextField field="dummyText" label="Dummy text" />
		<ImageField field="dummyImage" label="Dummy image" />

		<Box heading="Webmanifest">
			<TextField field="name" label="Name" />
			<TextField field="shortName" label="Short name" />
		</Box>

		<LocaleSideDimension>
			<SeoField field="seo" compact={false} />
		</LocaleSideDimension>
	</EditPage>
)
