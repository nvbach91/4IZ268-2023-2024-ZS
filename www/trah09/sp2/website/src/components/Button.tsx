import clsx from 'clsx'
import type { DistinctBaseButtonProps, SharedBaseButtonProps } from 'nextjs-button-base'
import { ButtonBase } from 'nextjs-button-base'
import type { FunctionComponent } from 'react'
import { Ripple } from 'react-ripple-click'
import styles from './Button.module.sass'

export type ButtonProps = {
	size?: 'small' | 'medium' | 'large'
	isFullWidth?: boolean
	variant?: 'primary' | 'secondary' | 'text'
} & Omit<SharedBaseButtonProps, 'className'> &
	DistinctBaseButtonProps

export const Button: FunctionComponent<ButtonProps> = ({
	children,
	size = 'medium',
	isFullWidth = false,
	variant = 'primary',
	...otherProps
}) => {
	return (
		<ButtonBase
			className={clsx(
				styles.wrapper,
				styles[`is_size_${size}`],
				styles[`is_variant_${variant}`],
				isFullWidth && styles.is_fullWidth,
			)}
			{...otherProps}
		>
			<Ripple />
			{children}
		</ButtonBase>
	)
}
