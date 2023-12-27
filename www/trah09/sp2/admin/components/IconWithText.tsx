import type { IconProps } from '@contember/admin'
import { Icon, Stack } from '@contember/admin'
import type { FunctionComponent, ReactNode } from 'react'

export type IconWithTextProps = {
	children?: ReactNode
} & Pick<IconProps, 'blueprintIcon' | 'contemberIcon' | 'customIcon'>

export const IconWithText: FunctionComponent<IconWithTextProps> = ({
	blueprintIcon,
	contemberIcon,
	customIcon,
	children,
}) => (
	<Stack horizontal gap="small">
		<Icon contemberIcon={contemberIcon} customIcon={customIcon} blueprintIcon={blueprintIcon} />
		{children}
	</Stack>
)
