const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const nextPlugins = []

nextPlugins.push(
	require('@next/bundle-analyzer')({
		enabled: process.env.ANALYZE === 'true',
	}),
)

const sentryConfig = {
	url: process.env.SENTRY_URL,
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	hideSourceMaps: true,
}
const useSentryConfiguration =
	process.env.NODE_ENV === 'production' &&
	sentryConfig.url &&
	sentryConfig.org &&
	sentryConfig.project &&
	sentryConfig.authToken

if (useSentryConfiguration) {
	nextPlugins.push([withSentryConfig, sentryConfig])
}
/** @type {import('next').NextConfig} */
const configuration = {
	reactStrictMode: true,
	i18n: require('./i18n'),
	experimental: {
		scrollRestoration: true,
	},
	images: {
		domains: ['localhost', 's3.eu-central-1.amazonaws.com', 'picsum.photos', 'data.eu.cntmbr.com'],
	},
	transpilePackages: ['@contember/client', '@contember/react-client'],
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			include: [path.resolve(__dirname, 'src/components/icons')],
			use: [
				{
					loader: 'svg-sprite-loader',
				},
			],
		})
		return config
	},
}

module.exports = () =>
	nextPlugins.reduce((acc, next) => {
		if (Array.isArray(next) && next.length === 2) {
			return next[0](acc, next[1])
		}
		return next(acc)
	}, configuration)
