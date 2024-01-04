// metoda pro upravovaní délky, příjmá metry, vrátí metry a kilometry cesty
export const getKilometersByMeters = (meters) => {
	const kilometers = Math.floor(meters / 1000)
	const remainingMeters = Math.round(meters % 1000)

	return {
		kilometers: kilometers,
		meters: remainingMeters
	}
}
