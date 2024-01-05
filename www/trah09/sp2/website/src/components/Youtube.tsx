import type { FunctionComponent } from 'react'
import styles from './Youtube.module.sass'

export interface YoutubeProps {
	videoId: string
}

export const Youtube: FunctionComponent<YoutubeProps> = ({ videoId }) => {
	return (
		<div className={styles.wrapper}>
			<iframe
				className={styles.in}
				width="560"
				height="315"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
		</div>
	)
}
