/* eslint-disable @typescript-eslint/require-await */
import type { GetServerSideProps } from 'next'

const rootUrl = process.env.NEXT_PUBLIC_WEB_URL

function Robots() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps = (async ({ res }) => {
	let content = 'User-agent: *'
	if (typeof rootUrl === 'string') {
		content += `\nSitemap: ${rootUrl}/sitemap.xml`
	}

	res.setHeader('Content-Type', 'text/plain')
	res.write(content)
	res.end()

	return {
		props: {},
	}
}) satisfies GetServerSideProps

export default Robots
