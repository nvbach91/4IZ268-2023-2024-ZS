import { useEffect, useRef } from 'react'
import { useIsNavigating } from './useIsNavigating'

export const useOnNavigationFinished = (callback: () => void) => {
	const isNavigating = useIsNavigating()
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (isNavigating) {
			return () => {
				callbackRef.current()
			}
		}
	}, [isNavigating])
}
