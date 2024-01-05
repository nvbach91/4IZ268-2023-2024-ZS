import { Box, Component, DateFieldView, Field } from '@contember/admin'

export interface FilledFormRendererProps {
	fields: { field: string; label: string; type: 'string' | 'number' | 'date' | 'boolean' }[]
}

export const FilledFormRenderer = Component<FilledFormRendererProps>((props) => {
	return (
		<Box>
			<dl>
				{props.fields.map((field) => {
					switch (field.type) {
						case 'string':
							return (
								<Field<string>
									key={field.field}
									field={field.field}
									format={(value) => {
										return value !== null ? (
											<>
												<dt>
													<strong>{field.label}:</strong>
												</dt>
												<dd>{value}</dd>
											</>
										) : null
									}}
								/>
							)
						case 'number':
							return (
								<Field<number>
									key={field.field}
									field={field.field}
									format={(value) => {
										return value !== null ? (
											<>
												<dt>
													<strong>{field.label}:</strong>
												</dt>
												<dd>{value}</dd>
											</>
										) : null
									}}
								/>
							)
						case 'date':
							return (
								<DateFieldView
									key={field.field}
									field={field.field}
									format={(date) => {
										return date !== null ? (
											<>
												<dt>
													<strong>{field.label}:</strong>
												</dt>
												<dd>{date.toLocaleDateString()}</dd>
											</>
										) : null
									}}
								/>
							)
						case 'boolean':
							return (
								<Field<boolean>
									key={field.field}
									field={field.field}
									format={(value) => {
										return value !== null ? (
											<>
												<dt>
													<strong>{field.label}:</strong>
												</dt>
												<dd>{value ? 'Yes' : 'No'}</dd>
											</>
										) : null
									}}
								/>
							)
					}
				})}
			</dl>
		</Box>
	)
})
