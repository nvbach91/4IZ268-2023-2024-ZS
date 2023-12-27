/* eslint-disable @typescript-eslint/no-explicit-any */

const getCircularReplacer = () => {
	const seen = new WeakSet()
	return (_: string | number, value: unknown) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return '#CYCLIC_VALUE#'
			}
			seen.add(value)
		}
		return value
	}
}

export function simplifyJson(json: string) {
	return json.replace(/\n(\s+)"([^\s"-]+)":/gi, (a, b, c) => {
		return `\n${b}${c}:`
	})
}

export function dump(value: any) {
	if (value === undefined) {
		return 'undefined'
	}
	return simplifyJson(JSON.stringify(value, getCircularReplacer(), 2))
}

dump.log = (...args: any[]) => {
	if (args.length === 1) {
		return console.log(dump(args[0]))
	}
	return console.log(dump(args))
}
