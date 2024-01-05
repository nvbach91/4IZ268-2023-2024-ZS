import clsx from 'clsx'
import style from './Container.module.sass'

export interface ContainerProps {
	size?: 'small' | 'normal' | 'wide' | 'fullWidth'
	disableGutters?: boolean
	children: React.ReactNode
}

export const Container: React.FunctionComponent<ContainerProps> = ({
	children,
	size = 'normal',
	disableGutters = false,
}) => {
	return (
		<div className={clsx(style.wrapper, style[`view_size_${size}`], disableGutters && style.view_disableGutters)}>
			{children}
		</div>
	)
}
