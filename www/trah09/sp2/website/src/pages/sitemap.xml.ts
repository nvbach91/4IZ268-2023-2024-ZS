import type { GetServerSideProps } from 'next'
import { contember } from '../utilities/contember'

const rootUrl = process.env.NEXT_PUBLIC_WEB_URL ?? ''

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps = (async ({ res, locale }) => {
	const { listLinkable, getGeneral } = await contember.query({
		getGeneral: [
			{
				by: {
					unique: 'One',
				},
			},
			{
				localesByLocale: [
					{
						by: {
							locale: {
								code: locale,
							},
						},
					},
					{
						seo: [
							{},
							{
								noIndex: true,
							},
						],
					},
				],
			},
		],
		listLinkable: [
			{
				filter: {
					redirect: { id: { isNull: true } },
					// Add all pages with seo
					genericPage: {
						seo: {
							noIndex: {
								notEq: true,
							},
						},
					},
				},
			},
			{
				url: true,
			},
		],
	})

	const linkables = getGeneral?.localesByLocale?.seo?.noIndex === true ? [] : listLinkable

	const sitemap = /* xml */ `<?xml version="1.0" encoding="UTF-8"?>
	 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${linkables
				.map(
					({ url }) => /* xml */ `
						<url>
								<loc>${`${rootUrl}${url}`}</loc>
						</url>
					`,
				)
				.join('')}
		</urlset>
	`

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}) satisfies GetServerSideProps

export default SiteMap
