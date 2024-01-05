import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Container } from '../components/Container'
import { ContentRenderer } from '../components/ContentRenderer'
import { Header } from '../components/Header'
import { Seo } from '../components/Seo'
import { HomePage } from '../components/pages/HomePage'
import { AvaibilityDateFragment } from '../data/AvaibilityDateFragment'
import { GeneralFragment } from '../data/GeneralFragment'
import { GenericPageLocaleFragment } from '../data/GenericPageLocaleFragment'
import { HeaderFragment } from '../data/HeaderFragment'
import { HomePageLocaleFragment } from '../data/HomePageLocaleFragment'
import { LinkFragment } from '../data/LinkFragment'
import { contember } from '../utilities/contember'
import { contemberLinkToHref } from '../utilities/contemberLinkToHref'
import { getLinkableUrlFromContext } from '../utilities/getLinkableUrlFromContext'

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ({ header, page, seo, homePage, dateOptions, locale }: PageProps) {
	return (
		<>
			<Seo {...seo} />
			{header && <Header {...header} />}
			{page && (
				<>
					<Container>
						<h2>{page.title}</h2>
					</Container>
					{page.content && <ContentRenderer content={page.content} />}
				</>
			)}
			{homePage && <HomePage data={homePage} dateOptions={dateOptions} activeLocaleCode={locale} />}
		</>
	)
}

export const getServerSideProps = (async (context) => {
	const url = getLinkableUrlFromContext(context)
	const { locale } = context

	if (!locale) {
		throw new Error('Locale not defined.')
	}
	const data = await contember.query({
		getGeneral: [
			{
				by: {
					unique: 'One',
				},
			},
			GeneralFragment(locale),
		],
		getHeader: [
			{
				by: {
					unique: 'One',
				},
			},
			HeaderFragment(locale),
		],
		getLinkable: [
			{
				by: { url },
			},
			{
				url: true,
				homePage: [{}, HomePageLocaleFragment()],
				genericPage: [{}, GenericPageLocaleFragment()],
				redirect: [
					{},
					{
						id: true,
						target: [{}, LinkFragment()],
					},
				],
			},
		],
		getCourse: [
			{ by: { unique: 'One' } },
			{ id: true, avaibilityDates: [{ orderBy: [{ order: 'asc' }] }, AvaibilityDateFragment()] },
		],
	})

	const redirectUrl = (() => {
		const target = data.getLinkable?.redirect?.target
		return target ? contemberLinkToHref(target) : null
	})()

	if (redirectUrl) {
		return {
			redirect: {
				permanent: false,
				destination: redirectUrl,
			},
		}
	}

	const canonicalUrl = (() => {
		const url = data.getLinkable?.url
		if (!url) {
			return null
		}
		return (process.env.NEXT_PUBLIC_WEB_URL ?? '') + url
	})()

	if (!data.getLinkable?.genericPage && !data.getLinkable?.homePage) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			general: data.getGeneral,
			header: data.getHeader,
			page: data.getLinkable?.genericPage,
			homePage: data.getLinkable?.homePage,
			dateOptions: data.getCourse?.avaibilityDates ?? [],
			seo: {
				canonicalUrl,
				seo: {
					...(data.getGeneral?.localesByLocale?.seo ?? {}),
					...Object.fromEntries(
						Object.entries(data.getLinkable?.genericPage?.seo ?? {}).filter(([_, value]) => Boolean(value)),
					),
				},
			},
			locale,
		},
	}
}) satisfies GetServerSideProps
