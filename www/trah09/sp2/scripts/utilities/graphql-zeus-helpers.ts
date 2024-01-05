import { join } from 'path'
import { $, fs } from 'zx'

export async function generateSchema(outputDir: string, name: string, params: { url: string; token: string }) {
	const targetPath = join(outputDir, name)
	await $`zeus ${params.url} ${targetPath} --typescript --header="Authorization: Bearer ${params.token}" --header="Content-Type: application/json" --header="Accept: application/json"`
	await patchZeusFile(targetPath)
}

function convertEnumsToUnions(content: string) {
	return content.replace(/export const enum ([a-zA-Z0-9_]+) \{([^}]+)\}/gm, (...args) => {
		return `export type ${args[1]} = ${String(args[2])
			.split('\n')
			.map((line) => line.trim().split(' = ')[0].trim())
			.filter(Boolean)
			.map((item) => `"${item}"`)
			.join(' | ')}`
	})
}

function fixJsonParseAsAny(content: string) {
	return content.replace(/const parsed = JSON.parse\(event.data\);/, 'const parsed = JSON.parse(event.data) as any;')
}

async function patchZeusFile(filepath: string) {
	const output = join(filepath, 'zeus/index.ts')
	const content = await fs.readFile(output, 'utf-8')

	let patched = convertEnumsToUnions(content)
	patched = fixJsonParseAsAny(patched)

	await fs.writeFile(output, patched, 'utf-8')
}
