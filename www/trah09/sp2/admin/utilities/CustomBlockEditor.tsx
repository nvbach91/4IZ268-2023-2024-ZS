import { BlockEditor, type BlockEditorProps, Box, Component, type EditorWithBlocks } from '@contember/admin'
import { type CreateEditorPublicOptions } from '@contember/admin/dist/types/components/bindingFacade/richText/editorFactory'
import {
	type FunctionComponent,
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { blockEditorBlocks } from './blockHelpers'
import { embedHandlers } from './blocks'
import { withAnchorsAsReference } from './editor/AnchorInsertHandler'
import { LinkElement } from './editor/CustomLinks'

export type BlockEditorWithPreviewsProps = {
	blockButtons: BlockEditorProps['blockButtons']
	otherBlockButtons: BlockEditorProps['otherBlockButtons']
	inlineButtons: BlockEditorProps['inlineButtons']
	augmentEditorBuiltins?: CreateEditorPublicOptions<EditorWithBlocks>['augmentEditorBuiltins']
}

export const CustomBlockEditor = Component<BlockEditorWithPreviewsProps>(
	({
		blockButtons,
		otherBlockButtons,
		inlineButtons,
		augmentEditorBuiltins: _, // @TODO
		...props
	}) => {
		return (
			<PreviewProvider>
				<BlockEditor
					referencesField="references"
					referenceDiscriminationField="type"
					field="content.blocks"
					inlineButtons={inlineButtons}
					label="Content"
					contentField="json"
					sortableBy="order"
					blockButtons={blockButtons}
					otherBlockButtons={otherBlockButtons}
					embedReferenceDiscriminateBy="embed"
					embedContentDiscriminationField="embed.type"
					embedHandlers={embedHandlers}
					augmentEditorBuiltins={(editor) => {
						withAnchorsAsReference(editor, {
							elementType: 'link',
							updateReference: (url, getAccessor) => {
								getAccessor().getField('link.type').updateValue('external')
								getAccessor().getField('link.url').updateValue(url)
							},
						})
						editor.registerElement({
							type: 'link',
							isInline: true,
							render: LinkElement,
						})
					}}
					{...props}
				>
					{blockEditorBlocks}
				</BlockEditor>
			</PreviewProvider>
		)
	},
	'BlockEditorWithPreviews',
)

const previewContext = createContext<{
	closePreview: () => void
	openPreview: (title: string | undefined, content: ReactNode) => void
}>({
	closePreview: () => {},
	openPreview: () => {},
})

export const useOpenPreview = () => useContext(previewContext).openPreview
export const useClosePreview = () => useContext(previewContext).closePreview

const PreviewProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	const [preview, setPreview] = useState<null | {
		title: string | undefined
		content: ReactNode
	}>(null)

	const [lastPreview, setLastPreview] = useState(preview)
	const isOpen = preview !== null

	useEffect(() => {
		if (preview) {
			setLastPreview(preview)
		}
	}, [preview])

	const closePreview = useCallback(() => {
		setPreview(null)
	}, [])

	const openPreview = useCallback((title: string | undefined, content: ReactNode) => {
		setPreview({ title, content })
	}, [])

	const value = useMemo(() => ({ closePreview, openPreview }), [closePreview, openPreview])

	return (
		<previewContext.Provider value={value}>
			<div
				style={{
					position: 'fixed',
					inset: '1rem 1rem auto',
					filter: 'drop-shadow(0 0 10px currentColor)',
					pointerEvents: 'none',
					zIndex: 1,
					maxWidth: '30rem',
					marginInline: 'auto',
					transitionProperty: 'opacity, visibility, transform',
					transitionDuration: '0.2s',
					transform: isOpen ? 'none' : 'translateY(-2rem)',
					opacity: isOpen ? 1 : 0,
					visibility: isOpen ? 'inherit' : 'hidden',
					transitionDelay: isOpen ? '0s' : '0.5s',
				}}
			>
				{lastPreview && (
					<Box heading={lastPreview.title === undefined ? undefined : `Preview: ${lastPreview.title}`}>
						{lastPreview.content}
					</Box>
				)}
			</div>
			{children}
		</previewContext.Provider>
	)
}
