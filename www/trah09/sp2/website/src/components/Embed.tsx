import type { FunctionComponent } from 'react'
import type { EmbedResult } from '../data/EmbedFragment'
import styles from './Embed.module.sass'
import { Vimeo } from './Vimeo'
import { Youtube } from './Youtube'

export type EmbedProps = EmbedResult

export const Embed: FunctionComponent<EmbedProps> = ({ type, embedId }) => {
	if (!embedId) {
		return null
	}
	return (
		<div className={styles.wrapper}>
			{type === 'youtube' ? <Youtube videoId={embedId} /> : type === 'vimeo' ? <Vimeo videoId={embedId} /> : null}
		</div>
	)
}
