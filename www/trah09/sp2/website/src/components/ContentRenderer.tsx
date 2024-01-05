import type { ReferenceRendererProps } from '@contember/react-client'
import { RichTextRenderer } from '@contember/react-client'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo, type FunctionComponent, type ReactNode } from 'react'
import type { ContentReferenceType } from '../../generated/contember/zeus'
import type { ContentBlockResult } from '../data/ContentBlockFragment'
import type { ContentResult } from '../data/ContentFragment'
import { contemberLinkToHrefTargetRel } from '../utilities/contemberLinkToHref'
import { useContentRendererCopyPasteBugWorkaround } from '../utilities/useContentRendererCopyPasteBugWorkaround'
import { Container } from './Container'
import styles from './ContentRenderer.module.sass'
import { Embed } from './Embed'
import { Linkables } from './Linkables'
import { ResponsiveImage } from './ResponsiveImage'
import { Wysiwyg } from './Wysiwyg'

export interface ContentRendererProps {
	content: ContentResult
	containerDisableGutters?: boolean
}

type Block = ReferenceRendererProps<ContentBlockResult['references'][number]>

const standaloneTypes = ['reference']
const nestedTypes = ['listItem', 'anchor', 'tableCell', 'tableRow', 'scrollTarget', 'link']

const referenceRenderers: {
	[referenceType in ContentReferenceType]?: (block: Block) => ReactNode
} = {
	image: function image({ reference }) {
		return (
			reference.image && (
				<Container>
					<ResponsiveImage
						src={reference.image.url}
						width={reference.image.width}
						height={reference.image.height}
						alt={reference.image.alt ?? ''}
					/>
				</Container>
			)
		)
	},
	linkables: function linkables({ reference }) {
		return (
			<Container>
				<Linkables title={reference.primaryText} items={reference.linkables} />
			</Container>
		)
	},
	link: function link({ reference }) {
		return (
			reference.link && (
				<Container>
					<Link {...contemberLinkToHrefTargetRel(reference.link)}>{reference.link.title}</Link>
				</Container>
			)
		)
	},
	embed: function embed({ reference }) {
		return (
			reference.embed && (
				<Container>
					<Embed {...reference.embed} />
				</Container>
			)
		)
	},
}

export const ContentRenderer: FunctionComponent<ContentRendererProps> = ({
	content,
	containerDisableGutters = false,
}) => {
	const blocks = useContentRendererCopyPasteBugWorkaround(content.blocks)

	return useMemo(
		() => (
			<div className={styles.wrapper}>
				<RichTextRenderer
					blocks={blocks}
					sourceField="json"
					renderElement={(element) => {
						const { type } = element.element

						if (type === 'table') {
							return (
								<div className={clsx(styles.section, styles[`is_reference_${type}`])}>
									<Container>{element.fallback}</Container>
								</div>
							)
						}

						if (nestedTypes.includes(type)) {
							const reference = element.reference as ContentBlockResult['references'][number] // @TODO: remove cast
							if (element.referenceType === 'link' && reference.link) {
								return <Link {...contemberLinkToHrefTargetRel(reference.link)}>{element.children}</Link>
							}
							return element.fallback
						}

						if (standaloneTypes.includes(type)) {
							return (
								<div
									className={clsx(
										styles.section,
										element.referenceType && styles[`is_reference_${element.referenceType}`],
									)}
								>
									{type !== 'reference' || !element.referenceType || element.referenceType in referenceRenderers ? (
										element.fallback
									) : (
										<Container disableGutters={containerDisableGutters}>
											<div className={styles.notImplemented}>
												<div className={styles.notImplemented_name}>{element.referenceType}</div>
												is not yet implemented
											</div>
										</Container>
									)}
								</div>
							)
						}
						return (
							<div className={clsx(styles.section, styles.is_wysiwyg)}>
								<Container disableGutters={containerDisableGutters}>
									<Wysiwyg>{element.fallback}</Wysiwyg>
								</Container>
							</div>
						)
					}}
					referenceRenderers={referenceRenderers}
				/>
			</div>
		),
		[blocks, containerDisableGutters],
	)
}
