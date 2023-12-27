import { initTRPC } from '@trpc/server'
import { apiTransformer } from '../utilities/apiTransformer'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
	transformer: apiTransformer,
	errorFormatter({ shape }) {
		return shape
	},
})

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
