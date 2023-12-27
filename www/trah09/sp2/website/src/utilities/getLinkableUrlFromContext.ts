import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export function getLinkableUrlFromContext(context: GetServerSidePropsContext | GetStaticPropsContext) {
	const parts = typeof context.params?.path === 'string' ? [context.params.path] : context.params?.path ?? []

	const localePrefix = context.defaultLocale === context.locale ? '' : `${context.locale}/`

	return `/${localePrefix}${parts.join('/')}`
}
