import { MultiEditPage, SelectField, Stack, TextField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Locale" rendererProps={{ title: 'Locales', sortableBy: 'order' }}>
		<Stack horizontal>
			<div style={{ flexBasis: 0, flexGrow: 1 }}>
				<SelectField
					field="code"
					label="Code"
					options={[
						{ value: 'en', label: 'English (en)' },
						{ value: 'cs', label: 'Česky (cs)' },
					]}
				/>
			</div>
			<div style={{ flexBasis: 0, flexGrow: 1 }}>
				<TextField field="label" label="Label" />
			</div>
		</Stack>
	</MultiEditPage>
)
