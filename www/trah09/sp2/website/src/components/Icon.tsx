import clsx from 'clsx'
import type { FunctionComponent } from 'react'
import style from './Icon.module.sass'
import * as icons from './icons'

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export type IconProps = {
	name: IconName
}

export const Icon: FunctionComponent<IconProps> = ({ name }) => {
	const icon = icons[name] as { viewBox: string; id: string } // @TODO: fix types in index.ts which are currently wrong (any)

	return (
		<svg viewBox={icon.viewBox} className={clsx(style.wrapper, style[`icon-${name}`])}>
			<use xlinkHref={`#${icon.id}`}></use>
		</svg>
	)
}
