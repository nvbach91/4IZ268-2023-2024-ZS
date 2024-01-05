import { router } from '../trpc'
import { contact } from './contact'

export const appRouter = router({
	contact,
	// Add other routes here
})

export type AppRouter = typeof appRouter
