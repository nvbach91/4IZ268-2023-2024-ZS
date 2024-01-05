import { HidingHeader } from 'hiding-header-react'
import 'hiding-header/dist/style.css'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import type { HeaderResult } from '../data/HeaderFragment'
import { contemberLinkToHref, contemberLinkToHrefTargetRel } from '../utilities/contemberLinkToHref'
import { Container } from './Container'
import styles from './Header.module.sass'
import { Icon } from './Icon'

export type HeaderProps = HeaderResult

export const Header: FunctionComponent<HeaderProps> = ({ localesByLocale: { title, links } = {} }) => {
	return (
		<HidingHeader>
			<div className={styles.wrapper}>
				<Container size="wide">
					<div className={styles.in}>
						<h1 className={styles.title}>{title}</h1>
						<ul className={styles.links}>
							{links?.items.map(
								({ id, link }) =>
									link && (
										<li key={id} className={styles.item}>
											<Link className={styles.link} {...contemberLinkToHrefTargetRel(link)}>
												{link.title ?? contemberLinkToHref(link)}
											</Link>
										</li>
									),
							)}
						</ul>
						<div className={styles.icons}>
							<Icon name="twitter" /> <Icon name="instagram" /> <Icon name="linkedin" />
						</div>
					</div>
				</Container>
			</div>
		</HidingHeader>
	)
}
