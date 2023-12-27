import clsx from 'clsx'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import type { HomePageResult } from '../data/HomePageLocaleFragment'
import styles from './LocaleSwitcher.module.sass'

export type LocaleSwitcherProps = {
	activeLocaleCode: string
	pageLocales?: NonNullable<HomePageResult['root']>['locales']
}

export const LocaleSwitcher: FunctionComponent<LocaleSwitcherProps> = ({ activeLocaleCode, pageLocales }) => {
	return (
		<div className={styles.wrapper}>
			{pageLocales?.map((locale) => {
				return (
					<Link
						key={locale.id}
						href={locale.link?.url ?? '/'}
						className={clsx(styles.localeCode, activeLocaleCode == locale.locale?.code && styles.is_active)}
						locale={locale.locale?.code}
					>
						{locale.locale?.code}
					</Link>
				)
			})}
		</div>
	)
}
