import type { ImageProps } from 'next/image'
import Image from 'next/image'
import type { FunctionComponent } from 'react'
import styles from './ResponsiveImage.module.sass'

export type ResponsiveImageProps = ImageProps

export const ResponsiveImage: FunctionComponent<ResponsiveImageProps> = (props) => {
	return (
		<div className={styles.wrapper}>
			{/* eslint-disable-next-line jsx-a11y/alt-text */}
			<Image {...props} />
		</div>
	)
}
