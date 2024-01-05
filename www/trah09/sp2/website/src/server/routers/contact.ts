import { z } from 'zod'
import { contember } from '../../utilities/contember'
import { publicProcedure, router } from '../trpc'

export const contact = router({
	send: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				email: z.string().min(1),
				tel: z.string().min(1),
				numberOfPeople: z.string(),
				date: z.string().min(1),
				note: z.string().nullish(),
			}),
		)
		.mutation(async ({ input }) => {
			const currentData = await contember.query({
				getAvaibilityDate: [{ by: { id: input.date } }, { numberOfOccupiedPlaces: true }],
			})

			const result = await contember.mutation({
				createReservation: [
					{
						data: {
							submittedAt: 'now',
							name: input.name,
							email: input.email,
							tel: input.tel,
							numberOfPeople: Number(input.numberOfPeople),
							avaibilityDate: { connect: { id: input.date } },
							note: input.note,
						},
					},
					{ ok: true, errorMessage: true },
				],
				updateAvaibilityDate: [
					{
						by: { id: input.date },
						data: {
							numberOfOccupiedPlaces:
								(currentData.getAvaibilityDate?.numberOfOccupiedPlaces ?? 0) + Number(input.numberOfPeople),
						},
					},
					{ ok: true, errorMessage: true },
				],
			})
			if (!result.createReservation?.ok) {
				console.error(result.createReservation?.errorMessage)
				throw new Error('Failed to create contact request submission.')
			}
			return { status: 'ok' }
		}),
})
