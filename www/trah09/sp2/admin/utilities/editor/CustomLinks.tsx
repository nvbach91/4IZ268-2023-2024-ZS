import {
	Box,
	Button,
	Component,
	Dropdown,
	EditorTransforms,
	Icon,
	useEditor,
	type EditorRenderElementProps,
	type InitializeReferenceContentProps,
} from '@contember/admin'
import { LinkField } from '@mangoweb/contember-plugins'
import { type Ref, type FunctionComponent } from 'react'
import './editorButton.css'

export const InsertLink = Component<InitializeReferenceContentProps>(
	({ onSuccess, onCancel }) => (
		<>
			<LinkField field="link" titleField={false} compact={false} />
			<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em', minWidth: '350px' }}>
				<Button onClick={onCancel}>{'Cancel'}</Button>
				<Button intent="primary" onClick={() => onSuccess({ createElement: { type: 'link' } })}>
					Insert
				</Button>
			</div>
		</>
	),
	() => <LinkField field="link" titleField={false} />,
)

export const LinkElement: FunctionComponent<EditorRenderElementProps> = (props: EditorRenderElementProps) => {
	const editor = useEditor()
	return (
		<span {...props.attributes} style={{ color: 'var(--cui-control-color)' }}>
			{props.children}
			<span contentEditable={false}>
				<Dropdown
					renderToggle={({ ref, onClick }) => (
						<button type="button" ref={ref as Ref<HTMLButtonElement>} onClick={onClick} className="editorButton">
							<Icon blueprintIcon="link" />
						</button>
					)}
				>
					<Box>
						<LinkField field="link" titleField={false} compact={false} />
						<Button
							size="small"
							onClick={() => EditorTransforms.unwrapNodes(editor, { at: [], match: (node) => node === props.element })}
						>
							Remove link
						</Button>
					</Box>
				</Dropdown>
			</span>
		</span>
	)
}
