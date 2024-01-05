import { RichTextRenderer } from '@contember/react-client'
import Image from 'next/image'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import type { AvaibilityDateFragment } from '../../data/AvaibilityDateFragment'
import type { HomePageResult } from '../../data/HomePageLocaleFragment'
import { ContactForm } from '../ContactForm'
import { Container } from '../Container'
import { Icon } from '../Icon'
import { LocaleSwitcher } from '../LocaleSwitcher'
import styles from './HomePage.module.sass'

export type HomePageProps = {
	data: HomePageResult
	dateOptions: AvaibilityDateFragment[]
	activeLocaleCode: string
}

export const HomePage: FunctionComponent<HomePageProps> = ({ data, dateOptions, activeLocaleCode }) => {
	return (
		<Container>
			<div className={styles.header}>
				<h1 className={styles.title}>{data.title}</h1>
				{data.root?.locales && (
					<div className={styles.localeSwitcher}>
						<LocaleSwitcher activeLocaleCode={activeLocaleCode} pageLocales={data.root?.locales} />
					</div>
				)}
			</div>

			{data.image && (
				<div
					className={styles.image}
					style={{ '--image-AspectRatio': (data.image.width ?? 1) / (data.image.height ?? 1) }}
				>
					<Image src={data.image.url} alt="" fill />
				</div>
			)}

			{data.description && (
				<div className={styles.description}>
					<RichTextRenderer source={data.description} />
				</div>
			)}

			{data.formFields && <ContactForm formFields={data.formFields} availibilityDates={dateOptions} />}
			<div className={styles.contacts}>
				{data.root?.address && (
					<div>
						<RichTextRenderer source={data.root?.address} />
					</div>
				)}
				<div className={styles.email}>
					<Link href={`mailto:${data.root?.email}`}>{data.root?.email}</Link>
				</div>
				<div className={styles.tel}>
					<Link href={`tel:${data.root?.tel}`}>{data.root?.tel}</Link>
				</div>
				<div className={styles.socials}>
					{data.root?.socials?.items.map((social, index) => {
						return social.socialLink?.type === 'facebook' ? (
							<div className={styles.fb} key={index}>
								<Link href={social.socialLink.url ?? '/'}>
									<Icon name="facebook" />
								</Link>
							</div>
						) : social.socialLink?.type === 'instagram' ? (
							<div className={styles.ig} key={index}>
								<Link href={social.socialLink.url ?? '/'}>
									<Icon name="instagram" />
								</Link>
							</div>
						) : null
					})}
				</div>
			</div>
		</Container>
	)
}
