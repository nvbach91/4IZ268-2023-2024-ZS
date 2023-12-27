/* eslint-disable @typescript-eslint/require-await */
import type * as trpc from '@trpc/server'
import type * as trpcNext from '@trpc/server/adapters/next'

type CreateContextOptions = Record<string, never>

export async function createContextInner(_opts: CreateContextOptions) {
	return {}
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

export async function createContext(_opts: trpcNext.CreateNextContextOptions): Promise<Context> {
	return await createContextInner({})
}
