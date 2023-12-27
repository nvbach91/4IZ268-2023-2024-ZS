import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '../server/routers/_app'
import { apiTransformer } from './apiTransformer'

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return `http://127.0.0.1:${process.env.PORT ?? 3000}`
}

export const api = createTRPCNext<AppRouter>({
	config() {
		return {
			transformer: apiTransformer,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		}
	},
	ssr: false,
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
