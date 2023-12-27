// Very naive but good enough
export const idToNumberHash = (id: string) => {
	let output = 0
	for (let i = 0; i < id.length; i++) {
		output += id[i].charCodeAt(0)
	}
	return output
}
