import type { FunctionComponent } from 'react'
import styles from './Vimeo.module.sass'

export interface VimeoProps {
	videoId: string
}

export const Vimeo: FunctionComponent<VimeoProps> = ({ videoId }) => {
	return (
		<div className={styles.wrapper}>
			<iframe
				className={styles.in}
				src={`https://player.vimeo.com/video/${videoId}?h=765b73ca29&title=0&byline=0&portrait=0`}
				width="640"
				height="360"
				allow="autoplay; fullscreen; picture-in-picture"
				title="Vimeo video player"
				allowFullScreen
			/>
		</div>
	)
}
