import Link from 'next/link'
import type { FunctionComponent } from 'react'
import type { ContentReferenceLinkableItemResult } from '../data/ContentReferenceLinkableItemFragment'
import styles from './Linkables.module.sass'

export interface LinkablesProps {
	title?: string
	items: ContentReferenceLinkableItemResult[]
}

export const Linkables: FunctionComponent<LinkablesProps> = ({ title, items }) => {
	return (
		<div className={styles.wrapper}>
			{title && <h3>{title}</h3>}
			<ul>
				{items.map(
					({ id, item }) =>
						item?.url && (
							<li key={id}>
								<Link href={item.url}>{item.url}</Link>
							</li>
						),
				)}
			</ul>
		</div>
	)
}
