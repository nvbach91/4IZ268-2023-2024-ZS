import WebmanifestPage, { createGetServerSideProps } from 'nextjs-webmanifest'
import { contember } from '../utilities/contember'

export default WebmanifestPage

export const getServerSideProps = createGetServerSideProps(async ({ locale }) => {
	const { getGeneral: general } = await contember.query({
		getGeneral: [
			{
				by: {
					unique: 'One',
				},
			},
			{
				name: true,
				shortName: true,
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
								description: true,
							},
						],
					},
				],
			},
		],
	})

	return {
		name: general?.name,
		short_name: general?.shortName,
		description: general?.localesByLocale?.seo?.description,
		start_url: '/',
		display: 'minimal-ui',
		lang: locale,
		id: locale,
		icons: [
			{
				src: '/favicon.svg',
				sizes: '256x256',
				type: 'image/svg+xml',
				purpose: 'any',
			},
		],
	}
})
