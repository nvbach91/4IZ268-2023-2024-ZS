import { useMirrorLoading } from 'shared-loading-indicator'
import { useIsNavigating } from '../utilities/useIsNavigating'

export const PageNavigationLoadingTracker = () => {
	const isNavigating = useIsNavigating()
	useMirrorLoading(isNavigating)

	return null
}
