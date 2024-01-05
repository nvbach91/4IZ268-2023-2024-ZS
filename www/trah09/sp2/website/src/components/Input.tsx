import type { FunctionComponent } from 'react'
import styles from './Input.module.sass'

export type InputProps = {
	title: string
	type: string
	name: string
	autoComplete?: string
	required?: boolean
	calendar?: boolean
	errorMessage?: string
	min?: string
	max?: string
	onChange: (value: string) => void
	value: string
	textarea?: boolean
}

export const Input: FunctionComponent<InputProps> = ({
	title,
	type,
	name,
	autoComplete,
	required,
	min,
	max,
	onChange,
	value,
	textarea,
}) => {
	return (
		<label className={styles.wrapper}>
			<div className={styles.title}>{title}</div>
			{textarea ? (
				<textarea
					className={styles.input}
					name={name}
					autoComplete={autoComplete}
					required={required}
					onChange={(event) => {
						onChange && onChange(event.target.value)
					}}
					value={value}
				/>
			) : (
				<input
					className={styles.input}
					type={type}
					name={name}
					autoComplete={autoComplete}
					required={required}
					min={min}
					max={max}
					onChange={(event) => {
						onChange && onChange(event.target.value)
					}}
					value={value}
				/>
			)}
		</label>
	)
}
