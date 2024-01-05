import type { FunctionComponent } from 'react'
import { useCallback, useState } from 'react'
import { dump } from '../utilities/dump'
import styles from './Dump.module.sass'

export interface DumpProps {
	data?: unknown
	max?: boolean
}

export const Dump: FunctionComponent<DumpProps> = ({ data, max }) => {
	const [maximized, setMaximized] = useState(max ?? false)

	const handleClick = useCallback(() => {
		setMaximized((value: boolean) => !value)
	}, [])

	const content = (
		<pre className={styles.Pre}>
			<span>{dump(data)}</span>
			<span className={styles.Corner}>
				<button type="button" className={styles.MaximizeButton} onClick={handleClick}>
					{maximized ? '-' : '+'}
				</button>
			</span>
		</pre>
	)

	return (
		<>
			<div className={[styles.Dump, maximized && styles.faded].join(' ')}>{content}</div>
			{maximized && <div className={[styles.Dump, styles.maximized].join(' ')}>{content}</div>}
		</>
	)
}
