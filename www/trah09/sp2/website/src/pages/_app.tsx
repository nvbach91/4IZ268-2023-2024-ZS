import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { useMedia } from 'react-use'
import { SharedLoadingIndicatorContextProvider, SharedProgressLoadingIndicator } from 'shared-loading-indicator'
import { PageNavigationLoadingTracker } from '../components/PageNavigationLoadingTracker'
import '../styles/globals.sass'
import { api } from '../utilities/api'
import { registerServiceWorker } from '../utilities/registerServiceWorker'

const inter = Inter({
	subsets: ['latin', 'latin-ext'],
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
registerServiceWorker()

function MyApp({ Component, pageProps }: AppProps) {
	const theme = useMedia('(prefers-color-scheme: light)', false) ? 'dark' : 'light'

	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${inter.style.fontFamily};
				}
			`}</style>
			<SharedLoadingIndicatorContextProvider>
				<PageNavigationLoadingTracker />
				<SharedProgressLoadingIndicator />
				<ToastContainer theme={theme} />
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</SharedLoadingIndicatorContextProvider>
		</>
	)
}

export default api.withTRPC(MyApp)
