// metoda pro získání přehledného času ze sekund
export const getTimeBySeconds = (seconds) => {
	const days = Math.floor(seconds / (24 * 60 * 60))
	const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
	const minutes = Math.floor((seconds % 60 * 60) / 60)
	const remainingSeconds = Math.round(seconds % 60)

	return {
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: remainingSeconds
	}
}