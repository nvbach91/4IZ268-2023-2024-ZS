import { Component, SlugField, type SlugFieldProps } from '@contember/admin'

export interface LinkUrlFieldProps extends Partial<SlugFieldProps> {
	derivedFrom: SlugFieldProps['derivedFrom']
	hardPrefix?:
		| string
		| {
				default: string
				[locale: string]: string
		  }
	softPrefix?: string
	label?: string
}

export const LinkUrlField = Component<LinkUrlFieldProps>(
	({ softPrefix, hardPrefix, derivedFrom, label = 'URL', ...props }) => (
		<SlugField
			field="link.url"
			derivedFrom={derivedFrom}
			label={label}
			unpersistedHardPrefix={(environment) => environment.getVariableOrElse('WEB_URL', '')}
			persistedHardPrefix={(environment) => {
				const locale = environment.getVariableOrElse<string, string>('currentLocaleCode', 'cs')
				const languagePrefix = locale === 'cs' ? '' : `${locale}/`
				const pathPrefix = (() => {
					const localeHardPrefix =
						hardPrefix && (typeof hardPrefix === 'string' ? hardPrefix : hardPrefix[locale] ?? hardPrefix.default)
					return localeHardPrefix ? `${localeHardPrefix}/` : ''
				})()
				return `/${languagePrefix}${pathPrefix}${softPrefix || ''}`
			}}
			persistedSoftPrefix={softPrefix}
			{...props}
		/>
	),
	'LinkUrlField',
)
