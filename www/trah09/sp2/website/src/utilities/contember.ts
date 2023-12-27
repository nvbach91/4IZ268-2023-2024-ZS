import { z } from 'zod'
import { Thunder } from '../../generated/contember/zeus'
import { GraphQLRequestError } from './GraphQLRequestError'
import { scalars } from './scalars'

const apiToken = process.env.CONTEMBER_TOKEN
const apiUrl = process.env.CONTEMBER_API_URL
const apiTokenStub = apiToken?.slice(0, 4) + '...'

export const contemberThunder = Thunder(async (query, variables) => {
	if (typeof apiUrl !== 'string') {
		throw new Error('Missing api url.')
	}

	const response = await fetch(apiUrl, {
		body: JSON.stringify({ query, variables }),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiToken}`,
		},
	})

	if (!response.ok) {
		return new Promise((_, reject) => {
			response
				.text()
				.then((text) => {
					try {
						reject(
							new GraphQLRequestError({
								url: apiUrl,
								token: apiTokenStub,
								query,
								variables,
								jsonResponse: JSON.parse(text),
							}),
						)
					} catch (err) {
						reject(new GraphQLRequestError({ url: apiUrl, token: apiTokenStub, query, variables, textResponse: text }))
					}
				})
				.catch(reject)
		})
	}

	const text = await response.text()

	const json = (() => {
		try {
			return JSON.parse(text)
		} catch (e) {
			return null
		}
	})()

	if (json) {
		const parsed = z.object({ data: z.any().nullish(), errors: z.unknown().nullish() }).parse(json)

		if ('errors' in parsed) {
			throw new GraphQLRequestError({
				url: apiUrl,
				query,
				variables,
				jsonResponse: { errors: parsed.errors, ...parsed },
			})
		}

		if ('data' in parsed) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return parsed.data
		}
	}

	throw new GraphQLRequestError({ url: apiUrl, token: apiTokenStub, query, variables, jsonResponse: text })
})

export const contember = {
	query: contemberThunder('query', { scalars }),
	mutation: contemberThunder('mutation', { scalars }),
}
