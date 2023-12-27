import { Block, type EmbedHandler, EmbedHandlers, Message, TextField } from '@contember/admin'
import { ImageField, LinkField } from '@mangoweb/contember-plugins'
import type { Blocks, ElementBlocks } from './blockHelpers'

// Add all blocks here
export const blocks = {
	image: {
		title: 'Image',
		blueprintIcon: 'media',
		form: <ImageField field="image" label={undefined} />,
	},
	link: {
		title: 'Link',
		blueprintIcon: 'add-column-right',
		form: <LinkField field="link" label={undefined} />,
	},
	linkables: {
		title: 'Linkables',
		blueprintIcon: 'properties',
		form: (
			<>
				<Message intent="danger">This is an example block. Remove it in production.</Message>
				<TextField field="primaryText" label="Title" />
			</>
		),
	},
	embed: {
		title: 'Embed',
		blueprintIcon: 'media',
		form: (
			<>
				<Block discriminateBy="youtube" label="YouTube video" />
				<Block discriminateBy="vimeo" label="Vimeo video" />
			</>
		),
	},
} as const satisfies Blocks

export const elementBlocks = {
	table: {
		title: 'Table',
		blueprintIcon: 'th',
	},
} as const satisfies ElementBlocks

export const embedHandlers = [
	new EmbedHandlers.YouTube({
		discriminateBy: 'youtube',
		youTubeIdField: 'embed.embedId',
	}),
	new EmbedHandlers.Vimeo({
		discriminateBy: 'vimeo',
		vimeoIdField: 'embed.embedId',
	}),
] satisfies Iterable<EmbedHandler>
