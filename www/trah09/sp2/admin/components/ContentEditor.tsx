import { type BlockEditorProps, Component, RichEditor } from '@contember/admin'
import { type BlockEditorWithPreviewsProps, CustomBlockEditor } from '../utilities/CustomBlockEditor'
import { blockButtons, elementBlockButtons } from '../utilities/blockHelpers'
import { InsertLink } from '../utilities/editor/CustomLinks'

const RB = RichEditor.buttons
const defaultFullEditorInlineButtons: BlockEditorProps['inlineButtons'] = [
	[
		RB.bold,
		RB.underline,
		{
			discriminateBy: 'link',
			referenceContent: InsertLink,
			label: 'Insert link',
			title: 'Insert link',
			blueprintIcon: 'link',
		},
	],
	[RB.headingOne, RB.headingTwo, RB.headingThree, RB.headingFour, RB.unorderedList, RB.orderedList, RB.scrollTarget],
	[RB.alignStart, RB.alignCenter, RB.alignEnd],
	[RB.strikeThrough, RB.code],
]
export const defaultBlockButtons: BlockEditorProps['blockButtons'] = [[blockButtons.image], [blockButtons.linkables]]
export const defaultOtherBlockButtons: BlockEditorProps['otherBlockButtons'] = [elementBlockButtons.table]

export const ContentEditor = Component<Partial<BlockEditorWithPreviewsProps>>(
	({
		blockButtons = defaultBlockButtons,
		otherBlockButtons = defaultOtherBlockButtons,
		inlineButtons = defaultFullEditorInlineButtons,
		augmentEditorBuiltins: _,
		...props
	}) => (
		<CustomBlockEditor
			inlineButtons={inlineButtons}
			blockButtons={blockButtons}
			otherBlockButtons={otherBlockButtons}
			{...props}
		/>
	),
	'ContentEditor',
)
