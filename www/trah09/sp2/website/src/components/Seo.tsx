import Head from 'next/head'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'
import type { SeoResult } from '../data/SeoFragment'

export type SeoProps = {
	canonicalUrl: string | null
	seo: SeoResult
}

export const Seo: FunctionComponent<SeoProps> = ({
	canonicalUrl,
	seo: { title, description, ogTitle, ogDescription, ogImage, noIndex, noFollow },
}) => {
	const robots = useMemo(() => {
		const robots: string[] = []
		if (noIndex) {
			robots.push('noindex')
		}
		if (noFollow) {
			robots.push('nofollow')
		}
		return robots
	}, [noFollow, noIndex])

	return (
		<Head>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
			<meta property="og:locale" content="en_US" />
			{ogTitle && <meta property="og:title" content={ogTitle} />}
			{ogDescription && <meta property="og:description" content={ogDescription} />}
			{ogImage && (
				<>
					<meta property="og:image" content={ogImage.url} />
					{ogImage.alt && <meta property="og:image:alt" content={ogImage.alt} />}
					{ogImage.width && <meta property="og:image:width" content={`${ogImage.width}`} />}
					{ogImage.height && <meta property="og:image:height" content={`${ogImage.height}`} />}
				</>
			)}
			{robots.length > 0 && <meta name="robots" content={robots.join(', ')} />}
			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
		</Head>
	)
}
