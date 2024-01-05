import { ApplicationEntrypoint, Pages, runReactApp } from '@contember/admin'
import '@contember/admin/style.css'
import { Layout } from './components/Layout'

runReactApp(
	<ApplicationEntrypoint
		basePath={import.meta.env.BASE_URL}
		apiBaseUrl={import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL}
		sessionToken={import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN}
		project={import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME}
		stage="live"
		envVariables={{ WEB_URL: import.meta.env.VITE_CONTEMBER_ADMIN_WEB_URL, flag: '' }}
	>
		<Pages layout={Layout}>{import.meta.globEager('./pages/**/*.tsx')}</Pages>
	</ApplicationEntrypoint>,
)
