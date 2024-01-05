export function satisfies<T>() {
	return <U extends T>(t: U) => t
}
