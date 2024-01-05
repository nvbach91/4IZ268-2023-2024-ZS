export const registerServiceWorker = async () => {
	if ('navigator' in globalThis && 'serviceWorker' in navigator) {
		await navigator.serviceWorker.register('/serviceWorker.js')
	}
}
