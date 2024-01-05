import { Block, type BlockEditorProps, Icon, type IconSourceSpecification } from '@contember/admin'
import { type FunctionComponent, type ReactNode, useCallback } from 'react'
import { type ContentReferenceType } from '../../api/model/Content'
import { IconWithText } from '../components/IconWithText'
import { useClosePreview, useOpenPreview } from './CustomBlockEditor'
import { blocks, elementBlocks } from './blocks'

type BlockType = (typeof ContentReferenceType.values)[number]
type ElementBlockType = 'table'

type ButtonBlock = NonNullable<BlockEditorProps['otherBlockButtons']>[number]
type FormBlock = Omit<ButtonBlock, 'descriminateBy'> & {
	form: ReactNode
	preview?: ReactNode
	alternate?: ReactNode
}
export type Blocks = Record<BlockType, FormBlock>
export type ElementBlocks = Record<ElementBlockType, Omit<FormBlock, 'form'>>

type OptionsFlags<Type> = {
	[Property in keyof Type]: {
		discriminateBy: Property
	} & ButtonBlock
}

interface BlockButtonIconWithPreviewProps {
	title: string | undefined
	preview: ReactNode | undefined
	icons: IconSourceSpecification
}
const BlockButtonIconWithPreview: FunctionComponent<BlockButtonIconWithPreviewProps> = ({ preview, title, icons }) => {
	const openPreview = useOpenPreview()
	const closePreview = useClosePreview()

	const handleMouseEnter = useCallback(() => {
		if (preview) {
			openPreview(title, preview)
		}
	}, [openPreview, preview, title])

	const handleMouseLeave = useCallback(() => {
		closePreview()
	}, [closePreview])

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Icon {...icons} />
		</div>
	)
}

const transformToBlockButtons = <BlocksType extends Blocks | ElementBlocks /* one of */>(
	key: 'discriminateBy' | 'elementType',
	blocks: BlocksType,
) =>
	Object.fromEntries(
		Object.entries(blocks).map(([keyValue, { alternate: _, preview, ...data }]) => {
			const icons: IconSourceSpecification = {}
			if ('customIcon' in data) {
				icons.customIcon = data.customIcon
			}
			if ('blueprintIcon' in data) {
				icons.blueprintIcon = data.blueprintIcon
			}
			if ('contemberIcon' in data) {
				icons.contemberIcon = data.contemberIcon
			}
			const customIcon =
				Object.keys(icons).length === 0 ? undefined : (
					<BlockButtonIconWithPreview title={data.title} preview={preview} icons={icons} />
				)
			const dataWithoutForm = 'form' in data ? { ...data, form: undefined } : data
			return [
				keyValue,
				{
					...dataWithoutForm,
					[key]: keyValue,
					customIcon,
				},
			]
		}),
	) as OptionsFlags<BlocksType>

export const blockButtons = transformToBlockButtons<Blocks>('discriminateBy', blocks)
export const elementBlockButtons = transformToBlockButtons<ElementBlocks>('elementType', elementBlocks)

export const blockEditorBlocks = Object.entries(blocks as Blocks).map(
	([descriminateBy, { form, blueprintIcon, customIcon, contemberIcon, title, alternate }]) => (
		<Block
			key={descriminateBy}
			discriminateBy={descriminateBy}
			label={
				<IconWithText blueprintIcon={blueprintIcon} customIcon={customIcon} contemberIcon={contemberIcon}>
					{title}
				</IconWithText>
			}
			alternate={alternate}
		>
			{form}
		</Block>
	),
)
