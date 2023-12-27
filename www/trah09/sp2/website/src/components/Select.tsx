import type { FunctionComponent } from 'react'
import styles from './Select.module.sass'

export type OptionType = {
	value: string
	label: string
}

export type SelectProps = {
	name: string
	title: string
	onChange: (value: string) => void
	value: string
	options: OptionType[]
	required?: boolean
}

export const Select: FunctionComponent<SelectProps> = ({ title, name, options, required, onChange, value }) => {
	return (
		<label>
			<div>{title}</div>
			<select
				className={styles.select}
				name={name}
				required={required}
				onChange={(event) => {
					onChange && onChange(event.currentTarget.value)
				}}
				value={value}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	)
}
