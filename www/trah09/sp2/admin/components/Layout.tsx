import { Layout as ContemberLayout, DimensionsSwitcher } from '@contember/admin'
import type { ReactNode } from 'react'
import { Navigation } from './Navigation'

export const Layout = (props: { children?: ReactNode }) => (
	<ContemberLayout
		sidebarHeader="Contember"
		navigation={<Navigation />}
		switchers={
			<DimensionsSwitcher
				optionEntities="Locale"
				orderBy="order"
				dimension="locale"
				labelField="code"
				slugField="code"
				maxItems={2}
			/>
		}
	>
		{props.children}
	</ContemberLayout>
)
