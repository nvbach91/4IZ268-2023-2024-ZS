import { MultiEditPage, Stack, TextField } from '@contember/admin'
import { LinkField } from '@mangoweb/contember-plugins'

export const list = (
	<MultiEditPage
		entities="Redirect"
		rendererProps={{
			title: 'Redirects',
			enableAddingNew: true,
			enableRemoving: true,
		}}
	>
		<Stack horizontal>
			<div style={{ flexGrow: 1 }}>
				<TextField field="link.url" label="From URL" />
			</div>
			<div style={{ flexGrow: 1 }}>
				<TextField field="note" label="Note" />
			</div>
		</Stack>
		<LinkField field="target" titleField={false} label="To URL" />
	</MultiEditPage>
)
