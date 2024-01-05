import dotenv from 'dotenv'
import path from 'path'
import { generateSchema } from './utilities/graphql-zeus-helpers'

console.log('Generating schema')

dotenv.config({ path: path.resolve(process.cwd(), 'website', '.env.local'), override: true })
dotenv.config({ path: path.resolve(process.cwd(), 'website', '.env') })

async function main() {
	const outputDir = './website/generated'
	const apiToken = process.env.CONTEMBER_TOKEN
	const apiUrl = process.env.CONTEMBER_API_URL

	if (typeof apiToken !== 'string') {
		throw new Error('Api token not supplied.')
	}

	if (typeof apiUrl !== 'string') {
		throw new Error('Api url not supplied.')
	}

	await generateSchema(outputDir, 'contember', { url: apiUrl, token: apiToken })
}

main().catch(console.error)
