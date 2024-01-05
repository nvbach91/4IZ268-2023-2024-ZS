import chalk from 'chalk'
import { config } from 'dotenv'
import { readFile, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import { exit } from 'process'

const localProjectSlug = 'app'
const localAdminToken = '0000000000000000000000000000000000000000'
const lastUsedAdminTokenFilePath = 'scripts/import-database-last.txt'

const readUserInput = async (): Promise<{
	stage: string
	adminToken: string
}> => {
	const stageChoices = ['prod', 'beta'] as const

	const lastUsedAdminToken = await (async (): Promise<string | null> => {
		try {
			return (await readFile(lastUsedAdminTokenFilePath)).toString().trim()
		} catch (error) {
			// ignore
		}
		return null
	})()

	const { stage } = await inquirer.prompt<{
		stage: (typeof stageChoices)[number]
	}>({
		type: 'list',
		name: 'stage',
		message: 'Which stage do you want to import from?',
		choices: stageChoices,
	})

	const { adminToken } = await inquirer.prompt<{
		adminToken: string
	}>({
		type: 'input',
		name: 'adminToken',
		message: 'Enter admin token:',
		default: lastUsedAdminToken,
	})

	if (!adminToken) {
		throw new Error('Admin token is required.')
	}

	await writeFile(lastUsedAdminTokenFilePath, adminToken)

	return { stage, adminToken }
}

try {
	console.log('Import database (from cloud)')

	const { stage, adminToken } = await readUserInput()

	const contentApiUrl = config({ path: `website/.env.${stage}` }).parsed?.CONTEMBER_API_URL ?? ''
	const contentApiUrlRegex = /(https:\/\/api-(.*)\.eu\.contember\.cloud\/)content\/(.*)\/.*/
	const parsedContantApiUrl = contentApiUrl.match(contentApiUrlRegex)
	if (parsedContantApiUrl === null) {
		throw new Error('API URL not found.')
	}
	const [_, apiBaseUrl, projectGroup, projectSlug] = parsedContantApiUrl
	console.log('Project group:', chalk.cyan(projectGroup))
	console.log('Project slug:', chalk.cyan(projectSlug))
	const exportUrl = `${apiBaseUrl}export`

	const cloudResponse = await fetch(exportUrl, {
		method: 'POST',
		headers: {
			'Accept-Encoding': 'gzip',
			Authorization: `Bearer ${adminToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			projects: [
				{
					slug: projectSlug,
					system: false,
				},
			],
		}),
	})
	const handleApiErrors = async (response: Response, errorPrefix: string) => {
		if (response.ok === true) {
			return
		}
		const data = (await response.json()) as { error: unknown; errors?: { message: unknown }[] }
		const message = data.error || data.errors?.map((error) => error.message).join(' ')
		throw new Error(`${errorPrefix} ${message}`)
	}
	await handleApiErrors(cloudResponse, 'Download failed.')

	const content = (await cloudResponse.text()).replaceAll(
		`"project":"${projectSlug}"`,
		`"project":"${localProjectSlug}"`,
	)
	console.log('Importing', chalk.magenta(Buffer.byteLength(content, 'utf8').toLocaleString('en')), 'bytes…')

	const localResponse = await fetch('http://localhost:1481/import', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-ndjson',
			Authorization: `Bearer ${localAdminToken}`,
		},
		body: content,
	})
	await handleApiErrors(localResponse, 'Local upload failed.')
	console.log(chalk.green('Import successful. 🎉'))
} catch (error) {
	console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error.'))
	exit(1)
}
